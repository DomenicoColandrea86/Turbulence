import Joi from 'joi';
// import Joi from '../../lib/joi-extended';
// import { tokenLength } from '../config/constants';

export const emailRules = Joi.string().email(); // .label('EmailLabel');
export const passwordRules = Joi.string().min(6).max(20).required(); // .label('PasswordLabel');
// export const usernameRules = Joi.string().alphanum().min(3).max(16); // .label('UsernameLabel');
// export const tokenRules = Joi.string().length(tokenLength).alphanum().label('TokenLabel');
// export const avatarRules = Joi.any().image().optional();
