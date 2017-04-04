
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../App/selectors';

class AccountStatus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Almost there...</h3>
            <p>Please check your email ({(user && user.email) || ''}) to confirm your account.</p>
            <hr />
            <p>If {(user && user.email) || ''} is not your email address, please go back and enter correct one.</p>
            <p>If you haven&#39;t received our email in 15 minutes, please check your spam folder.</p>
          </div>
        </div>
      </div>
    );
  }
}

AccountStatus.propTypes = {
  user: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(AccountStatus);
