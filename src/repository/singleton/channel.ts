import {singleton} from 'tsyringe';
import * as amqplib from 'amqplib';

@singleton()
class Channel {
  public conn?: amqplib.Connection;

  public verifyEnv() {
    if (process.env.AMQPLIB_URL === undefined) {
      throw new Error('Require env AMQPLIB_URL');
    }
  }

  public async initialize() {
    this.conn = await amqplib.connect(process.env.AMQPLIB_URL!);
  }

  public async close() {
    this.conn?.close();
  }
}

export default Channel;
