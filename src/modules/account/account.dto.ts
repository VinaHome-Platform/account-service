class AcceptApp {
  bms: boolean;
  cms: boolean;
  ams: boolean;
  driver: boolean;
}
export class DTO_RQ_CreateAccountStaff {
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
  accept_app: AcceptApp;
  company_id: number;
}

export class DTO_RQ_UpdateAccountStaff {
  username: string;
  number_phone: string;
  full_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  gender: string;
  status: boolean;
  role: string;
  accept_app: AcceptApp;
}

export class DTO_RP_AccountStaff {
  username: string;
  number_phone: string;
  full_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  gender: string;
  status: boolean;
  role: string;
  accept_app: AcceptApp;
}
