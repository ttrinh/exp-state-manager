import { ActionFactory } from 'lib/event';

import { SymbolActions } from './symbol/symbol-actions';
import { symbolProcessors } from './symbol/symbol-processors';

export type Actions = SymbolActions;

export const actionProcessors: ActionFactory<Actions> = (...rest) => {
  symbolProcessors(...rest);
};
