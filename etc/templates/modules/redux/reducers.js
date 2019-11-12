// %%PACK_NAME%% - Reducers

import { SET_STUFF } from './constants';

const initialState = {
  stuff: null,
};

const setStuff = (state, action) => ({ ...state, stuff: action.payload.stuff });

// Convenience association mapping between actions type and reducer functions
const FUNCTION_BY_ACTION = {
  [SET_STUFF]: setStuff,
};

export default (state = initialState, action) => {
  if (action && action.type in FUNCTION_BY_ACTION) {
    return FUNCTION_BY_ACTION[action.type](state, action);
  }

  return state;
};
