import { Account } from '@application/entities/Account';

export class AccountItem {
  private readonly type = 'Account';
  private readonly keys: AccountItem.Keys;

  constructor(private readonly attrs: AccountItem.Attributes) {
    this.keys = {
      PK: AccountItem.getPK(attrs.id),
      SK: AccountItem.getSK(attrs.id),
      GSI1PK: AccountItem.getGSI1PK(attrs.email),
      GSI1SK: AccountItem.getGSI1SK(attrs.email),
    };
  }

  toItem(): AccountItem.ItemType {
    return {
      ...this.attrs,
      ...this.keys,
      type: this.type,
    };
  }

  static fromEntity(account: Account) {
    return new AccountItem({
      ...account,
      createdAt: account.createdAt.toISOString(),
    });
  }

  static toEntity(accountItem: AccountItem.ItemType) {
    return new Account({
      id: accountItem.id,
      email: accountItem.email,
      externalId: accountItem.externalId,
      createdAt: new Date(accountItem.createdAt),
    });
  }

  static getPK(id: string): AccountItem.Keys['PK'] {
    return `ACCOUNT#${id}`;
  }

  static getSK(id: string): AccountItem.Keys['SK'] {
    return `ACCOUNT#${id}`;
  }

  static getGSI1PK(email: string): AccountItem.Keys['GSI1PK'] {
    return `ACCOUNT#${email}`;
  }

  static getGSI1SK(email: string): AccountItem.Keys['GSI1SK'] {
    return `ACCOUNT#${email}`;
  }
}

export namespace AccountItem {
  export type Keys = {
    PK: `ACCOUNT#${string}`;
    SK: `ACCOUNT#${string}`;
    GSI1PK: `ACCOUNT#${string}`;
    GSI1SK: `ACCOUNT#${string}`;
  }

  export type Attributes = {
    id: string;
    email: string;
    externalId: string;
    createdAt: string;
  }

  export type ItemType = Keys & Attributes & { type: 'Account' }
}
