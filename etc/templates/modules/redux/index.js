// %%PACK_NAME%% - module index

import { registerModuleReducer, registerModuleSaga } from 'redux-register-module';
import { STATE_KEY } from './constants';
import { some } from './sagas';
import reducers from './reducers';

function* rootSaga() {
  yield all([
    fork(some),
    // ... fork other stuffs
  ]);
}

registerModuleReducer(STATE_KEY, reducers);
registerModuleSaga(rootSaga);

// export what you need externally
export { } from './actions';
export { } from './selectors';
export { } from './constants';
