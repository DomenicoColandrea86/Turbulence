import Joi from 'joi';

const schema = Joi.object().keys({
  password: Joi.string().min(6).max(20).required(),
});

export default schema;
