// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
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
          import('containers/HomePage'),
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
          import('./containers/LoginPage/reducer'),
          import('./containers/LoginPage/sagas'),
          import('./containers/LoginPage'),
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
          import('./containers/SignupPage/reducer'),
          import('./containers/SignupPage/sagas'),
          import('./containers/SignupPage'),
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
      path: '/forgot',
      name: 'forgotPasswordPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('./containers/ForgotPasswordPage/reducer'),
          import('./containers/ForgotPasswordPage/sagas'),
          import('./containers/ForgotPasswordPage'),
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
          import('./containers/ResetPasswordPage/reducer'),
          import('./containers/ResetPasswordPage/sagas'),
          import('./containers/ResetPasswordPage'),
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
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];

  return {
    name: 'app',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('./containers/App/reducer'),
        import('containers/App/sagas'),
        import('containers/App'),
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
