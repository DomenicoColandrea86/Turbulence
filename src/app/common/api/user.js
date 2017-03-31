import { fetchJsonWithToken } from '../../utils/fetch';

export default {
  createTempUser(token, post) {
    return fetchJsonWithToken(token, '/api/v1/user/createTempUserSendVerifyEmail',
      {
        method: 'POST',
        body: JSON.stringify({ post }),
      });
  },
};
