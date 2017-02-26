import SignupSagas from '../../components/SignupForm/sagas';
import LoginSagas from '../../components/LoginForm/sagas';

// All sagas to be loaded
export default [
  ...SignupSagas,
  ...LoginSagas,
];
