#TURBULENCE

> To make honey, young bee need young flower, not old prune

## Quick start

1. Run `yarn` to install dependencies.

1. Start Mongodb `mongod` *(see prerequisites)*

1. At this point you can run `yarn start` and navigate to `http://localhost:3000`

Application has two separate directory `app` and `server`. The entry point for frontend is `src/app/app.js` and for backend it is `src/server/index.js`.

## Technology
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [redux-sagas]()
* [react-router](https://github.com/rackt/react-router)
* [webpack 2]()
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)
* [immutable.js]()
* [css modules]()
* [cssnext]()
* [PostCSS]()
* [jest]()
* [eslint](http://eslint.org)
* [mongodb]()

## Development

### Scripts

While developing, you will probably rely mostly on `yarn start` however, there are additional scripts at your disposal:

|`yarn <script>`|Description|
|-------------------|-----------|
|`analyze`|This command will generate a `stats.json` file from your production build which you can upload to the [webpack analyzer](https://webpack.github.io/analyse/) This analyzer will visualize your dependencies and chunks with detailed statistics about the bundle size.|
|`analyze:clean`|Removes `analyze.json` file generated from `analyze script`|
|`postinstall`|Builds Webpack DLL file (see `yarn build:dll`)|
|`build`|Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `dist` folder.|
|`build:clean`|Removes `/coverage` directory (see `yarn test:clean`)|
|`build:dll`| Creates `DLL` files for use with Webpack's `DLLPlugin`, Building all of your dependencies into a single file, optimizing webpack build speeds.|
|`start`|Serves your app at `localhost:3000`. Changes in the application code will be hot-reloaded.|
|`start:production`|Runs tests (see `yarn test`), Builds your app (see `yarn build`), Starts the production server (see `yarn start:prod`). The app is built for optimal performance: assets are minified and served gzipped.|
|`start:prod`|Starts the production server|
|`pretest`| Runs `yarn clean:test` and `yarn lint`|
|`lint`|Lints your JavaScript.|
|`clean:all`|Removes `stats.json` file (see `yarn analyze:clean`), Removes `/coverage` directory (see `yarn test:clean`), cleans build directory (see `yarn clean:build`)|
|`test`|Tests your application with the unit tests specified in the `**/tests/*.js` files throughout the application. All the `test` commands allow an optional `--[string]` argument to filter the tests run by Jest. Useful if you need to run a specific test only.|
|`test:clean`|Removes `/coverage` directory|
|`test:watch`|Watches changes to your application and re-runs tests whenever a file changes.|

### Developer Tools

**I recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

## Testing
Jest

## Deployment

### Heroku

1. `git add .`
2. `git commit -m 'Made some epic changes as per usual'`
3. `git push heroku master`
  
## Prerequisites

### Install MongoDB and Configure 'username/password' Authentication

1. Install Mongodb
1. Open a new terminal window and follow the steps below...<br>

~~~
// connect to the mongo shell
$ mongo

// create Turbulence db
$ use Turbulence

// create auth user
$ db.createUser(
  {
    user: "admin",
    pwd: "password",
  	roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
~~~

## Requirements
* node `^6.9.1`
* yarn `^0.17.0` or npm `^3.10.8`


## Author

Domenico Colandrea

## License

This project is licensed under the MIT license, Copyright (c) 2017 Domenico Colandrea. For more information see `LICENSE.md`.
