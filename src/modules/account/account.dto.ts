class AcceptApp {
  bms: boolean;
  cms: boolean;
  ams: boolean;
  driver: boolean;
}
export class CreateAccountStaff {
  username: string;
  password: string;
  number_phone: string;
  full_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  gender: string;
  status: boolean;
  role: string;
  account_type: string;
  accept_app: AcceptApp;
  company_id: number;
}
