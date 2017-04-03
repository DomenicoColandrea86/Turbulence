/* eslint-disable global-require */

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas, redirectToLogin, redirectHome } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  const childRoutes = [
    {
      onEnter: redirectToLogin,
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectHome,
      path: '/login',
      name: 'loginPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('./containers/LoginPage/reducer'),
          require('./containers/LoginPage/sagas'),
          require('./containers/LoginPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectHome,
      path: '/signup',
      name: 'signupPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('./containers/SignupPage/reducer'),
          require('./containers/SignupPage/sagas'),
          require('./containers/SignupPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signupPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectHome,
      path: '/account',
      name: 'accountStatusPage',
      getComponent(nextState, cb) {
        require('containers/AccountStatusPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/account/accept/:token',
      name: 'confirmAccountPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('./containers/ConfirmAccountPage/reducer'),
          require('./containers/ConfirmAccountPage/sagas'),
          require('./containers/ConfirmAccountPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('confirmAccountPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectHome,
      path: '/forgot',
      name: 'forgotPasswordPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('./containers/ForgotPasswordPage/reducer'),
          require('./containers/ForgotPasswordPage/sagas'),
          require('./containers/ForgotPasswordPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('forgotPasswordPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/reset/:token',
      name: 'resetPasswordPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('./containers/ResetPasswordPage/reducer'),
          require('./containers/ResetPasswordPage/sagas'),
          require('./containers/ResetPasswordPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('resetPasswordPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        require('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];

  return {
    name: 'app',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        require('./containers/App/reducer'),
        require('containers/App/sagas'),
        require('containers/App'),
      ]);
      const renderRoute = loadModule(cb);
      importModules.then(([reducer, sagas, component]) => {
        injectReducer('app', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
    childRoutes,
  };
}
