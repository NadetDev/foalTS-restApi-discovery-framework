import { ApiController } from './api.controller';
import { SwaggerController } from '@foal/swagger';

export class OpenapiController extends SwaggerController {
  options = { controllerClass: ApiController };
}
