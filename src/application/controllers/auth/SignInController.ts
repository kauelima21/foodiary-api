import { Controller } from '@application/contracts/Controller';
import { SignInBody, signInSchema } from '@application/controllers/auth/schemas/signInSchema';
import { SignInUseCase } from '@application/usecases/auth/SignInUseCase';
import { Schema } from '@kernel/decorators/Schema';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<'public', SignInController.Response> {
  constructor(private readonly signInUseCase: SignInUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.HttpRequest<'public', SignInBody>,
  ): Promise<Controller.HttpResponse<SignInController.Response>> {
    const { email, password } = body;

    const {
      refreshToken,
      accessToken,
    } = await this.signInUseCase.execute({ email, password });

    return {
      statusCode: 200,
      body: {
        refreshToken,
        accessToken,
      },
    };
  }
}

export namespace SignInController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
