import {
  CreateSymbols,
  CREATE_SYMBOLS,
  EditSymbolsStyle,
  EDIT_SYMBOLS_STYLE,
} from './symbol/symbol-actions';
import { dispatch } from './use-store';

const createSymbols = (payload: CreateSymbols['payload']) =>
  dispatch({ type: CREATE_SYMBOLS, payload });

const editSymbolsStyle = (payload: EditSymbolsStyle['payload']) =>
  dispatch({ type: EDIT_SYMBOLS_STYLE, payload });

export const actions = {
  symbols: {
    create: createSymbols,
    editStyle: editSymbolsStyle,
  },
};
