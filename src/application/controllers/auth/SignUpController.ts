import { Controller } from '@application/contracts/Controller';
import { SignUpBody, signUpSchema } from '@application/controllers/auth/schemas/signUpSchema';
import { SignUpUseCase } from '@application/usecases/auth/SignUpUseCase';
import { Schema } from '@kernel/decorators/Schema';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<unknown> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.HttpRequest<SignUpBody>
  ): Promise<Controller.HttpResponse<SignUpController.Response>> {
    const { account } = body;

    const {
      refreshToken,
      accessToken
    } = await this.signUpUseCase.execute(account);

    return {
      statusCode: 201,
      body: {
        refreshToken,
        accessToken
      },
    };
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
