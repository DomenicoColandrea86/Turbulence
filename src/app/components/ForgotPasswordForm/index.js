/*
* ForgotPasswordForm
*/

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { forgotPasswordRequest } from '../../containers/ForgotPasswordPage/actions';

import * as styles from './styles.css';

const RenderField = ({ id, input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input {...input} type={type} placeholder={label} className="form-control" />
    {touched && error && <span>{error}</span>}
  </div>
);

const ForgotPasswordForm = function ForgotPasswordForm({ handleSubmit, submitting }) {
  return (
    <form className={styles.login__form} onSubmit={handleSubmit}>
      <Field name="email" id="email" type="email" component={RenderField} label="Email" />
      <div>
        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>Reset Password</button>
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
        dispatch(forgotPasswordRequest({ data, resolve, reject }));
      });
    },
  };
}

ForgotPasswordForm.propTypes = {
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

export default (connect(
  mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'forgotPasswordForm' })(ForgotPasswordForm)));
