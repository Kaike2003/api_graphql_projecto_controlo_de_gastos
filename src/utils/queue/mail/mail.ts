export interface IEmailCreateAccount {
  user: {
    name: string;
    email: string;
    code?: string;
  };
}
