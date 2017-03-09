import Joi from 'joi';

const schema = Joi.object().keys({
  password: Joi.string().min(6).max(20).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
});

export default schema;
