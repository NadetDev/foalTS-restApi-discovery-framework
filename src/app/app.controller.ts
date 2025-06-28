import { ApiController, OpenapiController } from './controllers';
import { IAppController, controller } from '@foal/core';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/swagger', OpenapiController),
  ];
}
