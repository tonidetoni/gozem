import mongoose from 'mongoose';
import { config } from '@root/config';
import { Log } from '@global/helpers/Logger';

export const databaseConnection = async () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL)
      .then(() => {
        Log.info('Successful connect to database');
        return Promise.resolve();
      })
      .catch((e) => {
        Log.error(`Error when connecting to database ${e}`);
        process.exit(1);
      });
  };
  await connect();
  mongoose.connection.on('disconnected', connect);
};
