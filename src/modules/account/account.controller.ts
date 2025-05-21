import { Controller, HttpStatus } from '@nestjs/common';
import { AccountService } from './account.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  DTO_RQ_CreateAccountStaff,
  DTO_RQ_UpdateAccountStaff,
} from './account.dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ ac: 'create_account_staff' })
  async createAccountStaff(@Payload() data: DTO_RQ_CreateAccountStaff) {
    try {
      const result = await this.accountService.createAccountStaff(data);
      return {
        success: true,
        message: 'Tạo tài khoản nhân viên thành công!',
        statusCode: HttpStatus.OK,
        result,
      };
    } catch (error) {
      throw new RpcException({
        success: false,
        message: error.response?.message || 'Lỗi máy chủ dịch vụ!',
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @MessagePattern({ ac: 'delete_account_staff' })
  async deleteAccountStaff(@Payload() id: string) {
    try {
      const result = await this.accountService.deleteAccountStaff(id);
      return {
        success: true,
        message: 'Xóa tài khoản nhân viên thành công!',
        statusCode: HttpStatus.OK,
        result,
      };
    } catch (error) {
      throw new RpcException({
        success: false,
        message: error.response?.message || 'Lỗi máy chủ dịch vụ!',
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @MessagePattern({ ac: 'update_account_staff' })
  async updateAccountStaff(
    @Payload() data: { data: DTO_RQ_UpdateAccountStaff; id: string },
  ) {
    try {
      const result = await this.accountService.updateAccountStaff(
        data.data,
        data.id,
      );
      return {
        success: true,
        message: 'Cập nhật tài khoản nhân viên thành công!',
        statusCode: HttpStatus.OK,
        result,
      };
    } catch (error) {
      throw new RpcException({
        success: false,
        message: error.response?.message || 'Lỗi máy chủ dịch vụ!',
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
