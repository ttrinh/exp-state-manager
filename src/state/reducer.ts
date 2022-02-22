import produce from 'immer';

import {
  createSymbolsProcess,
  CreateSymbolsPayload,
} from './actions/create-symbols';
import { State } from './use-store';
import { CREATE_SYMBOLS } from './constants';

export type Action = {
  type: typeof CREATE_SYMBOLS;
  payload: CreateSymbolsPayload;
};

export const reducer = (state: State, { type, payload }: Action) =>
  produce(state, (draft) => {
    switch (type) {
      case CREATE_SYMBOLS:
        createSymbolsProcess(draft, payload);
        break;

      default:
        break;
    }
  });
