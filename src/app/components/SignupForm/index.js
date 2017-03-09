/**
 * SignupForm
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';

import * as styles from './styles.css';

const RenderField = ({ id, input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input {...input} type={type} placeholder={label} className="form-control" />
    {touched && error &&
    <div className={styles.error}>{error}</div>}
  </div>
);

const SignupForm = function SignupForm({ onSubmit, handleSubmit, submitting, error }) {
  return (
    <form className={styles.signup__form} onSubmit={handleSubmit(onSubmit)}>
      <Field name="firstName" id="firstName" type="firstName" component={RenderField} label="First Name" />
      <Field name="lastName" id="lastName" type="lastName" component={RenderField} label="Last Name" />
      <Field name="email" id="email" type="email" component={RenderField} label="Email" />
      <div>
        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>Create account</button>
        <p className="mt-2 mb-0">Have an account? <Link to="/login">Sign in</Link></p>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

SignupForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
};

RenderField.propTypes = {
  id: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.shape({
    error: React.PropTypes.object,
    touched: React.PropTypes.bool,
  }),
};

export default (connect()(reduxForm({ form: 'signupForm' })(SignupForm)));
