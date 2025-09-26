import { Controller } from '@application/contracts/Controller';
import { ConfirmForgotPasswordBody, confirmForgotPasswordSchema } from '@application/controllers/auth/schemas/confirmForgotPasswordSchema';
import { ConfirmForgotPasswordUseCase } from '@application/usecases/auth/ConfirmForgotPasswordUseCase';
import { Schema } from '@kernel/decorators/Schema';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
@Schema(confirmForgotPasswordSchema)
export class ConfirmForgotPasswordController extends Controller<'public', ConfirmForgotPasswordController.Response> {
  constructor(private readonly confirmForgotPasswordUseCase: ConfirmForgotPasswordUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.HttpRequest<'public', ConfirmForgotPasswordBody>,
  ): Promise<Controller.HttpResponse<ConfirmForgotPasswordController.Response>> {
    const { email, code, password } = body;

    await this.confirmForgotPasswordUseCase.execute({ email, code, password });

    return {
      statusCode: 204,
    };
  }
}

export namespace ConfirmForgotPasswordController {
  export type Response = null;
}
