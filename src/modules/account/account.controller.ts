import { Controller, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from './account.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAccountStaff } from './account.dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ ac: 'create_account_staff' })
  async createAccountStaff(data: CreateAccountStaff) {
    try {
      const result = await this.accountService.createAccountStaff(data);
      return {
        success: true,
        message: 'Tạo tài khoản nhân viên thành công!',
        result,
      };
    } catch (error) {
      console.error('Error creating account staff:', error);
      throw new InternalServerErrorException({
        success: false,
        message: 'Lỗi hệ thống!',
      });
    }
  }
}
