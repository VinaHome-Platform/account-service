import { Controller, HttpStatus } from '@nestjs/common';
import { AccountService } from './account.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
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
      throw new RpcException({
        success: false,
        message: 'Lỗi máy chủ dịch vụ!!',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
