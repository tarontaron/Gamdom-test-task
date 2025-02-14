import 'dotenv/config';
import envSchema from '../validators/env.validator';

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const { DB_URL, JWT_SECRET, BCRYPT_SALT_ROUNDS } = value;

export {
  DB_URL,
  JWT_SECRET,
  BCRYPT_SALT_ROUNDS,
};
