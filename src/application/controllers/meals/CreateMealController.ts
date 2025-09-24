import { Controller } from '@application/contracts/Controller';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
export class CreateMealController extends Controller<'private', CreateMealController.Response> {
  protected override async handle({
    accountId,
  }: Controller.HttpRequest<'private'>): Promise<Controller.HttpResponse<CreateMealController.Response>> {
    return {
      statusCode: 201,
      body: {
        mealId: accountId,
      },
    };
  }
}

export namespace CreateMealController {
  export type Response = {
    mealId: string;
  }
}
