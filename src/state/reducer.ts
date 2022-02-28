import produce from 'immer';

import { State } from './types';
import {
  StyleUpdate,
  styleUpdateProcessor,
  STYLE_UPDATE,
} from './symbol/style-update';
import {
  SymbolsCreate,
  symbolsCreateProcessor,
  SYMBOLS_CREATE,
} from './symbol/symbol-create';

export type Action = StyleUpdate | SymbolsCreate;

export const reducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SYMBOLS_CREATE:
        return symbolsCreateProcessor(draft, action.payload);

      case STYLE_UPDATE:
        return styleUpdateProcessor(draft, action.payload);

      default:
        break;
    }
  });
