import {Db, MongoClient} from 'mongodb';
import {singleton} from 'tsyringe';

@singleton()
class Database {
  public client?: MongoClient;
  public db?: Db;

  public verifyEnv() {
    if (process.env.MONGO_URL === undefined) {
      throw new Error('Require env MONGO_URL');
    }
    if (process.env.MONGO_USER === undefined) {
      throw new Error('Require env MONGO_USER');
    }
    if (process.env.MONGO_PASSWORD === undefined) {
      throw new Error('Require env MONGO_PASSWORD');
    }
    if (process.env.MONGO_DB === undefined) {
      throw new Error('Require env MONGO_DB');
    }
  }

  public async initialize() {
    this.verifyEnv();
    this.client = await MongoClient.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.MONGO_USER!,
        password: process.env.MONGO_PASSWORD!,
      },
    });
    this.db = this.client.db(process.env.MONGO_DB!);
  }

  public async close() {
    this.client?.close();
  }
}

export default Database;
