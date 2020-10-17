import 'reflect-metadata';

import {describe, it} from 'mocha';

import {expect} from 'chai';
import {container} from 'tsyringe';
import TodoModel from '../../../src/repository/model/todo';
import Database from '../../../src/repository/singleton/database';

before(async () => await container.resolve(Database).initialize());
after(async () => await container.resolve(Database).client?.close());

describe('test TodoModel', () => {
  process.env.MONGO_URL = 'mongodb://localhost:27017';
  process.env.MONGO_USER = 'root';
  process.env.MONGO_PASSWORD = 'test';
  process.env.MONGO_DB = 'test';

  before(() => container.resolve(Database).initialize());
  after(() => container.resolve(Database).close());

  it('test insert', () => {
    const todo = container.resolve(TodoModel);
    expect(() => todo.insert('test', 'model')).not.throw();
  });

  it('test status', () => {
    const todo = container.resolve(TodoModel);
    expect(() => todo.status)
      .not.throw()
      .and.to.equal(true);
  });
});
