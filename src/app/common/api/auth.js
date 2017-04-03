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
};

export default auth;
