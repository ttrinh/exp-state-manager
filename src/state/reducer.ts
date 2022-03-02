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
import { symbolsUpdate } from './symbol/symbols-update';

export type Action =
  | StyleUpdate
  | SymbolsCreate
  | ReturnType<typeof symbolsUpdate['action']>;

const actionMap = [symbolsUpdate];

export const reducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SYMBOLS_CREATE:
        symbolsCreateProcessor(draft, action.payload);
        break;

      case STYLE_UPDATE:
        styleUpdateProcessor(draft, action.payload);
        break;

      default:
        break;
    }

    for (const item of actionMap) {
      if (item.type === action.type) {
        item.processor(draft, action.payload);
        break;
      }
    }
  });
