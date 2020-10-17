import {describe, it} from 'mocha';
import 'core-js/es7/reflect';

import {expect} from 'chai';
import {container} from 'tsyringe';
import Database from '../../src/repository/singleton/database';

describe('test database', () => {
  const database = container.resolve(Database);

  it('verifyEnv MONGO_URL', () => {
    process.env.MONGO_URL = undefined;
    process.env.MONGO_USER = undefined;
    process.env.MONGO_PASSWORD = undefined;
    process.env.MONGO_DB = undefined;
    expect(() => database.verifyEnv()).to.throw('Require env MONGO_URL');
  });

  it('verifyEnv MONGO_USER', () => {
    process.env.MONGO_URL = 'mongodb://localhost:27017';
    process.env.MONGO_USER = undefined;
    process.env.MONGO_PASSWORD = undefined;
    process.env.MONGO_DB = undefined;
    expect(() => database.verifyEnv()).to.throw('Require env MONGO_USER');
  });

  it('verifyEnv MONGO_PASSWORD', () => {
    process.env.MONGO_URL = 'mongodb://localhost:27017';
    process.env.MONGO_USER = 'root';
    process.env.MONGO_PASSWORD = undefined;
    process.env.MONGO_DB = undefined;
    expect(() => database.verifyEnv()).to.throw('Require env MONGO_PASSWORD');
  });

  it('verifyEnv MONGO_DB', () => {
    process.env.MONGO_URL = 'mongodb://localhost:27017';
    process.env.MONGO_USER = 'root';
    process.env.MONGO_PASSWORD = '';
    process.env.MONGO_DB = undefined;
    expect(() => database.verifyEnv()).to.throw('Require env MONGO_DB');
  });

  it('verifyEnv', () => {
    process.env.MONGO_URL = 'mongodb://localhost:27017';
    process.env.MONGO_USER = 'root';
    process.env.MONGO_PASSWORD = '';
    process.env.MONGO_DB = 'test';
    expect(() => database.verifyEnv()).not.throw();
  });

  it('initialize', async () => {
    process.env.MONGO_URL = 'mongodb://localhost:27017';
    process.env.MONGO_USER = 'root';
    process.env.MONGO_PASSWORD = '';
    process.env.MONGO_DB = 'test';

    await database.initialize();
    expect(database.client).to.not.be.null;
    expect(database.db).to.not.be.null;

    await database.close();
  });
});
