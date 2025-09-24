import KSUID from 'ksuid';

export class Account {
  readonly id: string;

  readonly email: string;

  readonly createdAt: Date;

  externalId: string;

  constructor ({ email, externalId, id, createdAt }: Account.Attributes) {
    this.id = id ?? KSUID.randomSync().string;
    this.email = email;
    this.externalId = externalId;
    this.createdAt = createdAt ?? new Date();
  }
}

export namespace Account {
  export type Attributes = {
    email: string;
    externalId: string;
    id?: string;
    createdAt?: Date;
  }
}
