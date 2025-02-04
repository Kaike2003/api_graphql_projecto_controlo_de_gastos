export interface InputCreateUser {
  data: {
    name: string;
    email: string;
    password: string;
  };
}

export interface InputAuthenticateByCodeUser {
  data: {
    code: string;
  };
}
