import { fetchJson } from '../../utils/fetch';

const auth = {
  // Logs a user in, returning a promise with `true` when done
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
};

export default auth;
