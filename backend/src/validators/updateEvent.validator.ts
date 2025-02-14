import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string(),
  odds: Joi.number(),
});

export default schema;
