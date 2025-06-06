import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { DTO_RQ_RefreshToken, LoginFormBMS } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ ac: 'login_bms' })
  async loginBms(@Payload() data: LoginFormBMS) {
    try {
      const result = await this.authService.loginBms(data);
      return {
        success: true,
        message: 'Đăng nhập thành công!',
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

  @MessagePattern({ ac: 'refresh_token' })
  async refreshToken(@Payload() data: DTO_RQ_RefreshToken) {
    try {
      const result = await this.authService.refreshToken(data);
      return {
        success: true,
        message: 'Làm mới token thành công!',
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
