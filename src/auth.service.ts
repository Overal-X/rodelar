import {
  IGenerateApiKey,
  ILoginArgs,
  IRegisterArgs,
  IValidateApiKey,
} from "./auth.type";

export class AuthService {
  register(args: IRegisterArgs) {}

  login(args: ILoginArgs) {}

  generateApiKey(args: IGenerateApiKey) {}

  validateApiKey(args: IValidateApiKey) {}
}
