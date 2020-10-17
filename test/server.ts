import 'core-js/es/reflect';

import server from '../src/server';
import {before, after} from 'mocha';

before(async () => {
  process.env.MONGO_URL = 'mongodb://localhost:27017';
  process.env.MONGO_USER = 'root';
  process.env.MONGO_PASSWORD = '';
  process.env.MONGO_DB = 'test';
  process.env.AMQPLIB_URL = 'amqp://localhost:5672';

  return server.fastify.listen(0);
});
after(async () => server.fastify.close());

export default server.fastify;
