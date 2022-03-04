import produce from 'immer';

import { State } from './types';
import { symbolsUpdate } from './symbol/symbols-update';
import { symbolsCreate } from './symbol/symbols-create';
import { stylesUpdate } from './symbol/styles-update';
import { GenericDispatch } from './state-utils/make-action';
import { processReducerFromAction } from './state-utils/process-reducer-from-action';
import { uiUpdate } from './ui/ui-update';

/***
 * ACTIONS
 */
const actionMap = [symbolsCreate, symbolsUpdate, stylesUpdate, uiUpdate];

export const makeDispatchableActions = <T>(dispatch: GenericDispatch<T>) => ({
  symbols: {
    create: symbolsCreate.actionDispatch(dispatch),
    update: symbolsUpdate.actionDispatch(dispatch),
    updateStyles: stylesUpdate.actionDispatch(dispatch),
  },
  ui: {
    update: uiUpdate.actionDispatch(dispatch),
  },
});

/***
 * REDUCER
 */
type Action = ReturnType<typeof actionMap[0]['action']>;

export const reducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    processReducerFromAction(draft, action, actionMap);
  });
