import { createHmac } from 'node:crypto';
import { ConfirmForgotPasswordCommand, ForgotPasswordCommand, GetTokensFromRefreshTokenCommand, InitiateAuthCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@infra/clients/cognitoClient';
import { Injectable } from '@kernel/di/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { InvalidRefreshToken } from '@application/errors/application/InvalidRefreshToken';
import { InvalidCredentials } from '@application/errors/application/InvalidCredentials';
import { ExpiredConfirmationCode } from '@application/errors/application/expiredConfirmationCode';

@Injectable()
export class AuthGateway {
  constructor(private readonly appConfig: AppConfig) {}

  async signUp({ email, password, internalId }: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
    const command = new SignUpCommand({
      ClientId: this.appConfig.auth.cognito.client.id,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'custom:internalId', Value: internalId },
      ],
      SecretHash: this.getSecretHash(email),
    });

    const { UserSub: externalId } = await cognitoClient.send(command);

    if (!externalId) throw new Error(`Failed to sign up user ${email}`);

    return { externalId };
  }

  async signIn({ email, password }: AuthGateway.SignInParams): Promise<AuthGateway.SignInResult> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.appConfig.auth.cognito.client.id,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: this.getSecretHash(email),
        },
      });

      const { AuthenticationResult } = await cognitoClient.send(command);

      if (!AuthenticationResult?.RefreshToken || !AuthenticationResult?.AccessToken) {
        throw new Error(`Failed to sign in user ${email}`);
      }

      return {
        accessToken: AuthenticationResult.AccessToken,
        refreshToken: AuthenticationResult.RefreshToken,
      };
    } catch {
      throw new InvalidCredentials();
    }
  }

  async refreshToken({ refreshToken }: AuthGateway.RefreshTokenParams): Promise<AuthGateway.RefreshTokenResult> {
    try {
      const command = new GetTokensFromRefreshTokenCommand({
        ClientId: this.appConfig.auth.cognito.client.id,
        RefreshToken: refreshToken,
        ClientSecret: this.appConfig.auth.cognito.client.secret,
      });

      const { AuthenticationResult } = await cognitoClient.send(command);

      if (!AuthenticationResult?.RefreshToken || !AuthenticationResult?.AccessToken) {
        throw new Error('Failed to refresh token');
      }

      return {
        accessToken: AuthenticationResult.AccessToken,
        refreshToken: AuthenticationResult.RefreshToken,
      };
    } catch {
      throw new InvalidRefreshToken();
    }
  }

  async forgotPassword({ email }: AuthGateway.ForgotPasswordParams): Promise<void> {
    const command = new ForgotPasswordCommand({
      ClientId: this.appConfig.auth.cognito.client.id,
      Username: email,
      SecretHash: this.getSecretHash(email),
    });

    await cognitoClient.send(command);
  }

  async confirmForgotPassword({ email, code, password }: AuthGateway.ConfirmForgotPasswordParams): Promise<void> {
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: this.appConfig.auth.cognito.client.id,
        Username: email,
        ConfirmationCode: code,
        Password: password,
        SecretHash: this.getSecretHash(email),
      });

      await cognitoClient.send(command);
    } catch {
      throw new ExpiredConfirmationCode();
    }
  }

  private getSecretHash(email: string) {
    const { id, secret } = this.appConfig.auth.cognito.client;

    return createHmac('SHA256', secret)
      .update(`${email}${id}`)
      .digest('base64');
  }
}

export namespace AuthGateway {
  export type SignUpParams = {
    email: string;
    password: string;
    internalId: string;
  }

  export type SignUpResult = {
    externalId: string;
  }

  export type SignInParams = {
    email: string;
    password: string;
  }

  export type SignInResult = {
    accessToken: string;
    refreshToken: string;
  }

  export type RefreshTokenParams = {
    refreshToken: string;
  }

  export type RefreshTokenResult = {
    accessToken: string;
    refreshToken: string;
  }

  export type ForgotPasswordParams = {
    email: string;
  }

  export type ConfirmForgotPasswordParams = {
    email: string;
    code: string;
    password: string;
  }
}
