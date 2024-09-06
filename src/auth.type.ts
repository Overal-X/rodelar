export interface IRegisterArgs {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface ILoginArgs {
  email: string;
  password: string;
}

export interface IGenerateApiKey {
  userId: string;
}

export interface IValidateApiKey {
  id: string;
  key: string;
}
