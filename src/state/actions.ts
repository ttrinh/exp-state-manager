import { CreateSymbols, CREATE_SYMBOLS } from './symbol/symbol-actions';
import { dispatch } from './use-store';

const createSymbols = (payload: CreateSymbols['payload']) =>
  dispatch({ type: CREATE_SYMBOLS, payload });

export const actions = {
  symbols: {
    create: createSymbols,
  },
};
