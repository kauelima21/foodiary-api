import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class InvalidCredentials extends ApplicationError {
  public override statusCode = 401;
  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.name = 'InvalidCredentials';
    this.message = message ?? 'Invalid Credentials';
    this.code = code ?? ErrorCode.INVALID_CREDENTIALS;
  }
}
