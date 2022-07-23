import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const DBNameCnx = 'signati';

function typeormModuleOptions(): MongooseModuleOptions {
  return {
    uri: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DB}?authSource=admin`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}

export default registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
