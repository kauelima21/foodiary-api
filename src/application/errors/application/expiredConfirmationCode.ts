import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class ExpiredConfirmationCode extends ApplicationError {
  public override statusCode = 401;
  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.name = 'ExpiredConfirmationCode';
    this.message = message ?? 'Expired Confirmation Code';
    this.code = code ?? ErrorCode.EXPIRED_CONFIRMATION_CODE;
  }
}
