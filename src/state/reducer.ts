import produce from 'immer';

import {
  createSymbolsProcess,
  editSymbolsStyleProcess,
} from './symbol/symbol-processors';
import {
  CreateSymbols,
  CREATE_SYMBOLS,
  EditSymbolsStyle,
  EDIT_SYMBOLS_STYLE,
} from './symbol/symbol-actions';
import { State } from './types';

export type Action = CreateSymbols | EditSymbolsStyle;

export const reducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CREATE_SYMBOLS:
        return createSymbolsProcess(draft, action.payload);

      case EDIT_SYMBOLS_STYLE:
        return editSymbolsStyleProcess(draft, action.payload);

      default:
        break;
    }
  });
