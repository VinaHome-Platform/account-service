export class LoginFormBMS {
  username: string;
  password: string;
}

export class DTO_RP_LoginBMS {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  id: string;
  username: string;
  full_name: string;
  company_id: number;
  role: string;
}

export class DTO_RQ_RefreshToken {
  refresh_token: string;
}
