import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class InvalidRefreshToken extends ApplicationError {
  public override statusCode = 401;
  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.name = 'InvalidRefreshToken';
    this.message = message ?? 'Invalid Refresh Token';
    this.code = code ?? ErrorCode.INVALID_REFRESH_TOKEN;
  }
}
