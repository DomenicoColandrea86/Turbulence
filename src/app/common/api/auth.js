import { fetchJson } from '../../utils/fetch';

const auth = {
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
   * Signup workflow
   */
  authConfirmAccount({ token }) {
    return fetchJson('/api/v1/user/authenticateConfirmAccountToken', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  create({ password, token }) {
    return fetchJson('/api/v1/user', {
      method: 'POST',
      body: JSON.stringify({
        password,
        token,
      }),
    });
  },
};

export default auth;
