# create-react-redux-saga-module

Prompt to create registerable modules that can be combined together to create a complete React/Redux application.

Modules are based on templates that stored in `./etc`

Two modules types are available

- `react + redux`
- `redux`

***

## Install

`npm i -g create-react-redux-saga-module`

Then run with `create-react-redux-saga-module`

## Prerequisite

Host project must provide the following dependencies

- `react` 16+
- `redux` 4+
- `redux-saga`  1.0.2+
- `redux-register-module` 1.0.5+
- `reselect` 4+

***

## Module bootstrap

Modules need to be bootstraped inside the host project

1. Boostrap reducers

```javascript
import { combineReducers } from 'redux';
import { getModuleReducerKey, getReducers } from 'redux-register-module';

import '@group/my-module';
import 'my-other-module';

const rootReducer = combineReducers({
  [getModuleReducerKey()]: combineReducers(getReducers()),
});

export default rootReducer;
```

2. Bootstrap sagas

```javascript
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { getSagas } from 'redux-register-module';

function* rootSagas() {
  yield all(getSagas().map(function* moduleSaga(f) {
    return yield f();
  }));
}

...

const sagaMiddleware = createSagaMiddleware();

...

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // ... apply other middlewares
));

sagaMiddleware.run(rootSagas);

// then return your store for Provider
```

## Prompt

`cd` to your project root where `./src/modules` exists

### Module types

#### React + Redux

The follwing dir structure will be created

```shell
src/modules/
└── my-module
    ├── components
    │   └── index.js
    ├── containers
    │   └── index.js
    ├── index.js
    ├── package.json
    └── store
        ├── actions.js
        ├── constants.js
        ├── middlewares.js
        ├── reducers.js
        ├── sagas.js
        └── selectors.js
```

#### Redux

The follwing dir structure will be created

```shell
src/modules/
└── my-module
    ├── actions.js
    ├── constants.js
    ├── index.js
    ├── middlewares.js
    ├── package.json
    ├── reducers.js
    ├── sagas.js
    └── selectors.js
```

### Module group

Optionally, modules may be created under a specfic directory inside `src/modules`

If provided it must match `/^([@a-z\-\_\d])+$/`

### Module name

The name must match `/^([a-z\-\_\d])+$/`

### Module version

NPM semver must be used
