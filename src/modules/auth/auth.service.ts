import { Injectable } from '@nestjs/common';
import { LoginFormBMS } from './auth.dto';

@Injectable()
export class AuthService {
  async loginBms(data: LoginFormBMS): Promise<any> {
    console.log('Login data:', data);
    return 2;
  }
}
