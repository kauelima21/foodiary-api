import { Controller } from '@application/contracts/Controller';
import { ForgotPasswordBody, forgotPasswordSchema } from '@application/controllers/auth/schemas/forgotPasswordSchema';
import { ForgotPasswordUseCase } from '@application/usecases/auth/ForgotPasswordUseCase';
import { Schema } from '@kernel/decorators/Schema';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
@Schema(forgotPasswordSchema)
export class ForgotPasswordController extends Controller<'public', ForgotPasswordController.Response> {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.HttpRequest<'public', ForgotPasswordBody>,
  ): Promise<Controller.HttpResponse<ForgotPasswordController.Response>> {
    const { email } = body;

    await this.forgotPasswordUseCase.execute({ email });

    return {
      statusCode: 204,
    };
  }
}

export namespace ForgotPasswordController {
  export type Response = null;
}
