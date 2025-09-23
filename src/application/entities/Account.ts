import KSUID from 'ksuid';

export class Account {
  readonly id: string;

  readonly email: string;

  readonly createdAt: Date;

  externalId: string;

  constructor ({ email, externalId }: Account.Attributes) {
    this.id = KSUID.randomSync().string;
    this.email = email;
    this.createdAt = new Date();
    this.externalId = externalId;
  }
}

export namespace Account {
  export type Attributes = {
    email: string;
    externalId: string;
  }
}
