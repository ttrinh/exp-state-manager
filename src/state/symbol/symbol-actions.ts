import { dispatch } from 'lib/event';
import { Symbol } from './symbol-state';

export const CREATE_SYMBOLS = '[SYMBOL] create symbols' as const;
export const EDIT_SYMBOLS = '[SYMBOL] edit symbols' as const;
export const REMOVE_SYMBOLS = '[SYMBOL] remove symbols' as const;

export type SymbolActions =
  | ReturnType<typeof createSymbols>
  | ReturnType<typeof removeSymbols>
  | ReturnType<typeof editSymbols>;

const createSymbols = (symbols: Symbol[], parentId?: string) =>
  dispatch({ type: CREATE_SYMBOLS, data: { symbols, parentId } });

const editSymbols = (symbols: Symbol[]) =>
  dispatch({ type: EDIT_SYMBOLS, data: symbols });

const removeSymbols = (symbolIds: string[]) =>
  dispatch({ type: REMOVE_SYMBOLS, data: symbolIds });

export const symbolActions = {
  create: createSymbols,
  edit: editSymbols,
  remove: removeSymbols,
};
