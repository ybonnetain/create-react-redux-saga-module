// %%PACK_NAME%% - Actions

import { SET_STUFF } from './constants';

export const setStuff = stuff => ({
  type: SET_STUFF,
  payload: { stuff },
});
