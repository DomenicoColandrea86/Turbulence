import { fetchJson } from '../../utils/fetch';

const user = {
  // Logs a user in
  login({ email, password }) {
    return fetchJson('/api/v1/user/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Logs the current user out
   */
  logout() {
    return fetchJson('/api/v1/user/logout', {
      method: 'POST',
    });
  },

  /**
   * Reauthenticate token
   */
  reauthenticate({ token }) {
    return fetchJson('/api/v1/user/reauthenticate', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  /**
   * Signup workflow
   */
  signup({ email, firstName, lastName }) {
    return fetchJson('/api/v1/user/createTempUserSendVerifyEmail', {
      method: 'POST',
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
    });
  },

  /**
   * Authenticate confirm account token
   */
  authConfirmAccount({ token }) {
    return fetchJson('/api/v1/user/authenticateConfirmAccountToken', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  /**
   * Create user
   */
  create({ password, token }) {
    return fetchJson('/api/v1/user', {
      method: 'POST',
      body: JSON.stringify({
        password,
        token,
      }),
    });
  },

  /**
   * Authenticate reset password token
   */
  authResetPassword({ token }) {
    return fetchJson('/api/v1/user/authenticateResetPasswordToken', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  /**
   * Authenticate reset password token
   */
  resetPassword({ password, token }) {
    return fetchJson('/api/v1/user/resetPassword', {
      method: 'POST',
      body: JSON.stringify({
        password,
        token,
      }),
    });
  },

  /**
   * Forgot password
   */
  forgotPassword({ email }) {
    return fetchJson('/api/v1/user/forgotPassword', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

export default user;
