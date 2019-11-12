// %%PACK_NAME%% - Sagas

import { buffers } from 'redux-saga';
import { actionChannel, call, delay, put, race, take, select, takeLatest, take } from 'redux-saga/effects';
import { SOME_ACTION } from './constants';
import { } from './selectors';
import { } from './actions'; 

function* someWorker(action) {
  if (__DEV__) {
    console.log(action);
  }
}

export const some = function* someWatcher() {
  yield takeLatest(SOME_ACTION, someWorker);
};
