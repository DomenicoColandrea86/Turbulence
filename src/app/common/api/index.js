import auth from './auth';
import user from './user';

// we compose all api for each category here as single entry point
// api will be an single entry point for all frame methods
// this is where common functions are put
export default {
  auth,
  user,
};
