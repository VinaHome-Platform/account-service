import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.schema';
import { Model } from 'mongoose';
import { CreateAccountStaff } from './account.dto';
import * as argon2 from 'argon2';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async createAccountStaff(data: CreateAccountStaff) {
    console.log('Data:', data);
    const existingAccount = await this.accountModel
      .findOne({ username: data.username })
      .lean();
    if (existingAccount) {
      console.log('Tài khoản đã tồn tại:', existingAccount);
      throw new RpcException({
        success: false,
        message: 'Tài khoản đã tồn tại!',
        statusCode: HttpStatus.CONFLICT,
      });
    }
    const hashedPassword = await argon2.hash(data.password);
    const accountData = {
      ...data,
      password: hashedPassword,
      account_type: 'BUS',
      _id: undefined,
    };
    delete accountData._id;

    const newAccount = new this.accountModel(accountData);
    const savedAccount = await newAccount.save();

    console.log('✅ Account created successfully:', {
      _id: savedAccount._id,
      username: savedAccount.username,
      account_type: savedAccount.account_type,
    });

    // 6. Trả về thông tin tài khoản (đã convert thành plain object)
    return savedAccount.toObject() as Account;
  }
}
