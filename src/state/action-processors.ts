import { ActionFactory } from 'lib/event';

import { symbolActions, SymbolActions } from './symbol/symbol-actions';
import { symbolProcessors } from './symbol/symbol-processors';

export type Actions = SymbolActions;

export const actionProcessors: ActionFactory<Actions> = (...rest) => {
  symbolProcessors(...rest);
};

export const actions = {
  symbols: symbolActions,
};
