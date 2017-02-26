/**
 * SignupForm
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';

import { signupRequest } from './actions';
import * as styles from './styles.css';

const RenderField = ({ id, input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input {...input} type={type} placeholder={label} className="form-control" />
    {touched && error && <span>{error}</span>}
  </div>
);

const SignupForm = function SignupForm({ handleSubmit, submitting }) {
  return (
    <form className={styles.signup__form} onSubmit={handleSubmit}>
      <Field name="firstName" id="firstName" type="firstName" component={RenderField} label="First Name" />
      <Field name="lastName" id="lastName" type="lastName" component={RenderField} label="Last Name" />
      <Field name="email" id="email" type="email" component={RenderField} label="Email" />
      <Field name="password" id="password" type="password" component={RenderField} label="Password" />
      <div>
        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>Create account</button>
        <p className="mt-2 mb-0">Have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </form>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    state: ownProps.state,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
    },
    onSubmit(data) {
      // handle async tasks with sagas
      // https://github.com/yelouafi/redux-saga/issues/161#issuecomment-191312502
      return new Promise((resolve, reject) => {
        dispatch(signupRequest({ data, resolve, reject }));
      });
    },
  };
}

SignupForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

RenderField.propTypes = {
  id: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
};

export default (connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'signupForm' })(SignupForm)));
