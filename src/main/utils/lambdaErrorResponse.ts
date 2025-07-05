import { ErrorCode } from '@application/errors/ErrorCode';

interface LambdaErrorResponseParams {
  statusCode: number;
  code: ErrorCode;
  message: any;
}

export function lambdaErrorResponse({ statusCode, code, message }: LambdaErrorResponseParams) {
  return {
    statusCode,
    body: JSON.stringify({
      error: {
        code,
        message
      }
    })
  }
}
