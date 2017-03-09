import * as _ from 'lodash';
import Joi from 'joi';
import he from 'he';

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
};

function collectErrors(error) {
  if (error !== null) {
    return _.groupBy(error.details, 'path');
  }
  return {};
}

function decodeMessages(error) {
  if (error !== null) {
    error.details = error.details.map((e) => ({ // eslint-disable-line no-param-reassign
      ...e,
      message: he.decode(e.message),
    }));
    return error;
  }
  return {};
}

function hydrate(flat) {
  return Object.keys(flat).sort().reduce((obj, path) =>
    _.set(obj, path, flat[path].map((s) => s.replace(/['"]+/g, ''))), {});
}

function pickMessages(error) {
  if (error !== null) {
    return Object.keys(error).reduce((obj, key) => {
      obj[key] = error[key].map((item) => item.message); // eslint-disable-line no-param-reassign
      return obj;
    }, {});
  }
  return {};
}

function validate(form, schema) {
  return Joi.validate(form, schema, validationOptions, (error) =>
    _.flowRight(hydrate, pickMessages, collectErrors, decodeMessages)(error));
}

export default validate;
