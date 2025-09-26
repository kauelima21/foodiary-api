import { Injectable } from '@kernel/di/Injectable';
import { AuthGateway } from '@infra/gateways/AuthGateway';

@Injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute({ email, code, password }: ConfirmForgotPasswordUseCase.Input): Promise<void> {
    await this.authGateway.confirmForgotPassword({ email, code, password });
  }
}

export namespace ConfirmForgotPasswordUseCase {
  export type Input = {
    email: string;
    code: string;
    password: string;
  }
}
