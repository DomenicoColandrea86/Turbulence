
import React from 'react';
import { connect } from 'react-redux';
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

const ConfirmAccountForm = function ConfirmAccountForm({ onSubmit, handleSubmit, submitting, error }) {
  return (
    <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
      <Field name="password" id="password" type="password" component={RenderField} label="Password" />
      <Field name="confirmPassword" id="confirmPassword" type="password" component={RenderField} label="Confirm Password" />
      <div>
        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>Set password and login</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

ConfirmAccountForm.propTypes = {
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

export default (connect()(reduxForm({ form: 'confirmAccountForm' })(ConfirmAccountForm)));
