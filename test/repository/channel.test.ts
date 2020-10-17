import 'core-js/es/reflect';

import {describe, it} from 'mocha';

import {expect} from 'chai';
import {container} from 'tsyringe';
import Channel from '../../src/repository/singleton/channel';

describe('test channel', () => {
  const channel = container.resolve(Channel);

  it('verifyEnv AMQPLIB_URL', () => {
    process.env.AMQPLIB_URL = undefined;
    expect(() => channel.verifyEnv()).to.throw('Require env AMQPLIB_URL');
  });

  it('verifyEnv', () => {
    process.env.AMQPLIB_URL = 'amqp://localhost:5672';
    expect(() => channel.verifyEnv()).not.throw();
  });

  it('initialize', async () => {
    process.env.AMQPLIB_URL = 'amqp://localhost:5672';

    await channel.initialize();
    expect(channel.conn).to.not.be.null;

    await channel.close();
  });
});
