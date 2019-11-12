// %%PACK_NAME%% - Selectors

import { createSelector } from 'reselect';
import { getModuleState } from 'redux-register-module';
import { STATE_KEY } from './constants';

export const stuffSelector = state => getModuleState(STATE_KEY, state).stuff;

// Reselect example ..
// export const orderedStuffsSelector = createSelector(
//   stuffSelector,
//   stuffs => documents.sort((a, b) =>
//     new Date(b.date) - new Date(a.date),
//   ),
// );
