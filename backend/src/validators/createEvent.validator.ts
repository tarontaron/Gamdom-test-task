import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  odds: Joi.number().required(),
});

export default schema;
