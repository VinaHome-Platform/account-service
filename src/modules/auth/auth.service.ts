/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DTO_RP_LoginBMS, LoginFormBMS } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../account/account.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  // [FEAT] Login BMS
  async loginBms(data: LoginFormBMS): Promise<DTO_RP_LoginBMS> {
    console.log('Login data:', data);
    const existingAccount = await this.accountModel
      .findOne({
        username: data.username,
      })
      .select('+password')
      .lean();
    console.log('Existing account:', existingAccount);
    if (!existingAccount) {
      throw new UnauthorizedException('Tài khoản không chính xác');
    }
    if (existingAccount.account_type !== 'BUS') {
      throw new UnauthorizedException('Tài khoản không có quyền truy cập');
    }
    if (existingAccount.status === false) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }
    if (existingAccount.accept_app.bms === false) {
      throw new UnauthorizedException('Tài khoản không có quyền truy cập');
    }

    const isPasswordValid = await argon2.verify(
      existingAccount.password,
      data.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    // 3. Trả về thông tin tài khoản (không bao gồm mật khẩu)
    const { password, ...accountWithoutPassword } = existingAccount;
    return {
      access_token: '1',
      refresh_token: '1',
      expires_in: 3600,
      id: accountWithoutPassword._id,
      username: accountWithoutPassword.username,
      full_name: accountWithoutPassword.full_name,
      company_id: accountWithoutPassword.company_id,
      role: accountWithoutPassword.role,
    } as DTO_RP_LoginBMS;
  }
}
