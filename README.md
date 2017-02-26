#TURBULENCE

> To make honey, young bee need young flower, not old prune

## Quick start

1. Run `$ yarn` to install dependencies.

1. Start Mongodb `$ mongod` *(see prerequisites)*

1. At this point you can run `$ yarn start` and navigate to `http://localhost:3000`

Application has two separate directory `app` and `server`. The entry point for frontend is `src/app/app.js` file and for backend it is `src/server/index.js`.

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

While developing, you will probably rely mostly on `$ yarn start` however, there are additional scripts at your disposal:

|`yarn run <script>`|Description|
|-------------------|-----------|
|`analyze:clean`|description|
|`preanalyze`|description|
|`analyze`|description|
|`postinstall`|description|
|`prebuild`|description|
|`build`|description|
|`build:clean`|description|
|`build:dll`|description|
|`start`|Serves your app at localhost:3000. HMR will be enabled in development.|
|`start:production`|description|
|`start:prod`|description|
|`clean:all`|description|
|`lint`|description|
|`lint:staged`|description|
|`lint:js`|description|
|`pretest`|description|
|`test:clean`|description|
|`test`|description|
|`test:watch`|description|
|`coveralls`|description|

### Developer Tools

**I recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

## Testing
Jest

  
## Prerequisites

### Install MongoDB and Configure 'username/password' Authentication

1. Install Mongodb
1. Open a new terminal window and follow the steps below...<br>

```
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
  ```

## Requirements
* node `^6.9.1`
* yarn `^0.17.0` or npm `^3.10.8`


## Author

Domenico Colandrea

## License

This project is licensed under the MIT license, Copyright (c) 2017 Domenico Colandrea. For more information see `LICENSE.md`.
