import {describe, it} from 'mocha';
import 'core-js/es7/reflect';

import {expect} from 'chai';
import {container} from 'tsyringe';
import TodoModel from '../../../src/repository/model/todo';
import Database from '../../../src/repository/singleton/database';

describe('test TodoModel', () => {
  process.env.MONGO_URL = 'mongodb://localhost:27017';
  process.env.MONGO_USER = 'root';
  process.env.MONGO_PASSWORD = '';
  process.env.MONGO_DB = 'test';

  const todo = container.resolve(TodoModel);

  it('test insert', () => {
    expect(() => todo.insert('test', 'model')).not.throw();
  });

  it('test status', () => {
    expect(() => todo.status)
      .not.throw()
      .and.to.equal(true);
  });

  before(async () => await container.resolve(Database).client?.close());
});
