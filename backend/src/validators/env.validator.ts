import joi from 'joi';

const schema = joi.object({
  DB_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  BCRYPT_SALT_ROUNDS: joi.string().required(),
}).prefs({ allowUnknown: true }).required();

export default schema;
