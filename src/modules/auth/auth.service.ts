/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DTO_RP_LoginBMS, DTO_RQ_RefreshToken, LoginFormBMS } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../account/account.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private AccountModel: Model<Account>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  // [FEAT] Login BMS
  async loginBms(data: LoginFormBMS): Promise<DTO_RP_LoginBMS> {
    console.log('Login data:', data);
    const existingAccount = await this.AccountModel.findOne({
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
    const { access_token, refresh_token } = await this.generateTokens(
      existingAccount._id.toString(),
      existingAccount.company_id,
      existingAccount.role,
    );
    return {
      access_token: access_token,
      refresh_token: refresh_token,
      expires_in: 3600,
      id: accountWithoutPassword._id,
      username: accountWithoutPassword.username,
      full_name: accountWithoutPassword.full_name,
      company_id: accountWithoutPassword.company_id,
      role: accountWithoutPassword.role,
    } as DTO_RP_LoginBMS;
  }

  async refreshToken(data: DTO_RQ_RefreshToken) {
    console.log('Refresh token data:', data);
    const token = await this.RefreshTokenModel.findOneAndDelete({
      token: data.refresh_token,
      expiryDate: { $gte: new Date() },
    });
    if (!token) {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }
    return this.generateTokens(
      token.account_id.toString(),
      token.company_id,
      token.role,
    );
  }

  async generateTokens(account_id: string, company_id: number, role: string) {
    const accessToken = this.jwtService.sign({ account_id, company_id, role });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, account_id, company_id, role);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async storeRefreshToken(
    token: string,
    account_id: string,
    company_id: number,
    role: string,
  ) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.RefreshTokenModel.create({
      token,
      account_id,
      company_id,
      role,
      expiryDate,
    });
  }
}
