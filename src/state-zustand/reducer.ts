import produce from 'immer';

import { createSymbols, CreateSymbolsPayload } from './actions/create-symbols';
import { State } from './use-store';

export type Action = {
  type: 'CREATE_SYMBOLS';
  payload: CreateSymbolsPayload;
};

export const reducer = (state: State, { type, payload }: Action) =>
  produce(state, (draft) => {
    switch (type) {
      case 'CREATE_SYMBOLS':
        createSymbols(draft, payload);
        break;

      default:
        break;
    }
  });
