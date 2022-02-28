import { StyleUpdatePayload, STYLE_UPDATE } from './symbol/style-update';
import { SymbolsCreatePayload, SYMBOLS_CREATE } from './symbol/symbol-create';
import { dispatch } from './use-store';

const createSymbols = (payload: SymbolsCreatePayload) =>
  dispatch({ type: SYMBOLS_CREATE, payload });

const updateStyle = (payload: StyleUpdatePayload) =>
  dispatch({ type: STYLE_UPDATE, payload });

export const actions = {
  symbols: {
    create: createSymbols,
    updateStyle,
  },
};
