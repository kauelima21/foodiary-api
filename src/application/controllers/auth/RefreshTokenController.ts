import { Controller } from '@application/contracts/Controller';
import { RefreshTokenBody, refreshTokenSchema } from '@application/controllers/auth/schemas/refreshTokenSchema';
import { RefreshTokenUseCase } from '@application/usecases/auth/RefreshTokenUseCase';
import { Schema } from '@kernel/decorators/Schema';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
@Schema(refreshTokenSchema)
export class RefreshTokenController extends Controller<'public', RefreshTokenController.Response> {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.HttpRequest<'public', RefreshTokenBody>,
  ): Promise<Controller.HttpResponse<RefreshTokenController.Response>> {
    const { refreshToken } = body;

    const {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    } = await this.refreshTokenUseCase.execute({ refreshToken });

    return {
      statusCode: 200,
      body: {
        refreshToken: newRefreshToken,
      accessToken: newAccessToken,
      },
    };
  }
}

export namespace RefreshTokenController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
