import { dispatch } from './use-store';
import { CreateSymbolsPayload } from './actions/create-symbols';
import { CREATE_SYMBOLS } from './constants';

export type Action = CreateSymbols;

// ACTION
export const createSymbols = (payload: CreateSymbolsPayload) =>
  dispatch({
    type: CREATE_SYMBOLS,
    payload,
  });

export type CreateSymbols = ReturnType<typeof createSymbols>;
