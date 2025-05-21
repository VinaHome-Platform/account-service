import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.schema';
import { Model } from 'mongoose';
import {
  DTO_RP_AccountStaff,
  DTO_RQ_CreateAccountStaff,
  DTO_RQ_UpdateAccountStaff,
} from './account.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  // [FEAT] Create Account Staff
  async createAccountStaff(
    data: DTO_RQ_CreateAccountStaff,
  ): Promise<DTO_RP_AccountStaff> {
    // console.log('Data:', data);

    // Kiểm tra xem tài khoản đã tồn tại hay chưa
    const existingAccount = await this.accountModel
      .findOne({ username: data.username })
      .lean()
      .exec();
    if (existingAccount) {
      // console.log('Tài khoản đã tồn tại:', existingAccount);
      throw new ConflictException('Tài khoản đã tồn tại');
    }
    // Mã hóa mật khẩu bằng argon2
    const hashedPassword = await argon2.hash(data.password);

    const createdAccount = await this.accountModel.create({
      ...data,
      password: hashedPassword,
      account_type: 'BUS',
    });

    return {
      id: createdAccount._id,
      username: createdAccount.username,
      number_phone: createdAccount.number_phone,
      full_name: createdAccount.full_name,
      email: createdAccount.email,
      address: createdAccount.address,
      date_of_birth: createdAccount.date_of_birth,
      gender: createdAccount.gender,
      status: createdAccount.status,
      role: createdAccount.role,
      accept_app: createdAccount.accept_app,
    } as DTO_RP_AccountStaff;
  }

  // [FEAT] Delete Account Staff
  async deleteAccountStaff(id: string): Promise<void> {
    console.log('ID:', id);
    const result = await this.accountModel.findByIdAndDelete(id).lean().exec();
    if (!result) {
      throw new NotFoundException('Không tìm thấy dữ liệu tài khoản');
    }
  }

  // [FEAT] Update Account Staff
  async updateAccountStaff(
    data: DTO_RQ_UpdateAccountStaff,
    id: string,
  ): Promise<DTO_RP_AccountStaff> {
    const updatedAccount = await this.accountModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
    if (!updatedAccount) {
      throw new NotFoundException('Không tìm thấy dữ liệu tài khoản');
    }
    return {
      id: updatedAccount._id,
      username: updatedAccount.username,
      number_phone: updatedAccount.number_phone,
      full_name: updatedAccount.full_name,
      email: updatedAccount.email,
      address: updatedAccount.address,
      date_of_birth: updatedAccount.date_of_birth,
      gender: updatedAccount.gender,
      status: updatedAccount.status,
      role: updatedAccount.role,
      accept_app: updatedAccount.accept_app,
    } as DTO_RP_AccountStaff;
  }
}
