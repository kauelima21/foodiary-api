import { Injectable } from '@kernel/di/Injectable';
import { AuthGateway } from '@infra/gateways/AuthGateway';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute({ email }: ForgotPasswordUseCase.Input): Promise<void> {
    await this.authGateway.forgotPassword({ email });
  }
}

export namespace ForgotPasswordUseCase {
  export type Input = {
    email: string;
  }
}
