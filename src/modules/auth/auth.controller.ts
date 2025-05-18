import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginFormBMS } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ ac: 'login_bms' })
  async loginBms(data: LoginFormBMS) {
    try {
      const response = await this.authService.loginBms(data);
      return {
        success: true,
        message: 'Đăng nhập thành công!',
        result: response,
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        success: false,
        message: 'Lỗi hệ thống',
      };
    }
  }
}
