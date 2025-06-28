import { Logger, ServiceManager } from '@foal/core';

import { Todo } from '../app/entities';
import { dataSource } from '../db';

export const schema = {
  additionalProperties: false,
  properties: {
    text: { type: 'string' },
  },
  required: ['text'],
  type: 'object',
};

export async function main(
  args: { text: string },
  services: ServiceManager,
  logger: Logger
) {
  await dataSource.initialize();

  try {
    const todo = new Todo();
    todo.text = args.text;

    const todoCreated = await todo.save();
    logger.info(`Todo created: ${JSON.stringify(todoCreated)}`);
  } catch (error: any) {
    logger.error(`Error on Todo create: ${JSON.stringify(error.message)}`);
  } finally {
    await dataSource.destroy();
  }
}
