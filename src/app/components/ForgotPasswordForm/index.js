/*
* ForgotPasswordForm
*/

import React from 'react';
import * as _ from 'lodash';
import Promise from 'bluebird';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import schema from './schema';
import validate from '../../utils/validation';
import { forgotPasswordRequest } from '../../containers/ForgotPasswordPage/actions';
import * as styles from './styles.css';


const RenderField = ({ id, input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input {...input} type={type} placeholder={label} className="form-control" />
    {touched && error &&
    <div className={styles.error}>{error}</div>}
  </div>
);

const ForgotPasswordForm = function ForgotPasswordForm({ error, handleSubmit, submitting }) {
  return (
    <form className={styles.login__form} onSubmit={handleSubmit}>
      <Field name="email" id="email" type="email" component={RenderField} label="Email" />
      <div>
        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>Reset Password</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
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
      const errors = validate(data.toJS(), schema);
      if (!_.isEmpty(errors)) throw new SubmissionError(errors);
      return new Promise((resolve, reject) => {
        dispatch(forgotPasswordRequest({ data, resolve, reject }));
      }).catch((error) => {
        throw new SubmissionError({ _error: error.msg });
      });
    },
  };
}

ForgotPasswordForm.propTypes = {
  error: React.PropTypes.string,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
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

export default (connect(
  mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'forgotPasswordForm' })(ForgotPasswordForm)));
