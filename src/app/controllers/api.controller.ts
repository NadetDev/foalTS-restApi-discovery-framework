import {
  ApiInfo,
  ApiServer,
  Context,
  Delete,
  Get,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  ValidateBody,
} from '@foal/core';

import { Todo } from '../entities';

@ApiInfo({
  title: 'NadetDev FoalTS API',
  version: '1.0.0',
})
@ApiServer({
  url: '/api',
})
export class ApiController {
  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

  @Get('/todos')
  async getTodos() {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @Post('/todos')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      text: { type: 'string' },
    },
    required: ['text'],
    type: 'object',
  })
  async createTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await todo.save();
    return new HttpResponseOK(todo);
  }

  @Delete('/todos/:id')
  async deleteTodo(ctx: Context) {
    const todo = await Todo.findOneBy({ id: ctx.request.params.id });

    if (!todo) {
      return new HttpResponseNotFound();
    }
    await todo.remove();

    return new HttpResponseNoContent();
  }
}
