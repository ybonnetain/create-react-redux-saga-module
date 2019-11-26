// %%PACK_NAME%% - module index

import { registerModuleReducer, registerModuleSaga } from 'redux-register-module';
import { all, fork } from 'redux-saga/effects';
import { STATE_KEY } from './store/constants';
import { some } from './store/sagas';
import reducers from './store/reducers';
import Component from './containers';

function* rootSaga() {
  yield all([
    fork(some),
    // ... fork other stuffs
  ]);
}

registerModuleReducer(STATE_KEY, reducers);
registerModuleSaga(rootSaga);

// export what you need externally
export { } from './store/actions';
export { } from './store/selectors';
export { } from './store/constants';
export default Component;
