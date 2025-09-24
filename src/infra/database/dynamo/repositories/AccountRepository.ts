import { Account } from '@application/entities/Account';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/di/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { AccountItem } from '../items/AccountItem';

@Injectable()
export class AccountRepository {
  constructor(private readonly config: AppConfig) {}

  async findByEmail(email: string): Promise<Account | null> {
    const command = new QueryCommand({
      TableName: this.config.db.dynamodb.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :gsi1pk AND GSI1SK = :gsi1sk',
      ExpressionAttributeValues: {
        ':gsi1pk': AccountItem.getGSI1PK(email),
        ':gsi1sk': AccountItem.getGSI1SK(email),
      },
    });

    const { Items = [] } = await dynamoClient.send(command);
    const account = Items[0] as AccountItem.ItemType | undefined;

    if (!account) return null;

    return AccountItem.toEntity(account);
  }

  async create(account: Account): Promise<void> {
    const accountItem = AccountItem.fromEntity(account);

    const command = new PutCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
