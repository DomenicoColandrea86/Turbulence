import Joi from 'joi';

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export default schema;
