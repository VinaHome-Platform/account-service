import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.schema';
import { Model } from 'mongoose';
import { CreateAccountStaff } from './account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async createAccountStaff(data: CreateAccountStaff) {
    console.log('Data:', data);
  }
}
