import produce from 'immer';

import { createSymbolsProcess } from './symbol/symbol-processors';
import { CreateSymbols, CREATE_SYMBOLS } from './symbol/symbol-actions';
import { State } from './types';

export type Action = CreateSymbols;

export const reducer = (state: State, { type, payload }: Action) =>
  produce(state, (draft) => {
    switch (type) {
      case CREATE_SYMBOLS:
        return createSymbolsProcess(draft, payload);

      default:
        break;
    }
  });
