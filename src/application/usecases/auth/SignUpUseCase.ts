import { Injectable } from '@kernel/di/Injectable';
import { AuthGateway } from '@infra/gateways/AuthGateway';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute(input: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const { externalId } = await this.authGateway.signUp(input);

    const { accessToken, refreshToken } = await this.authGateway.signIn(input);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    email: string;
    password: string;
  }

  export type Output = {
    accessToken: string;
    refreshToken: string;
  }
}
