import { Controller } from '@application/contracts/Controller';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
export class CreateMealController extends Controller<unknown> {
  protected override async handle(): Promise<Controller.HttpResponse<CreateMealController.Response>> {
    return {
      statusCode: 201,
      body: {
        mealId: 'XXX',
      },
    };
  }
}

export namespace CreateMealController {
  export type Response = {
    mealId: string;
  }
}
