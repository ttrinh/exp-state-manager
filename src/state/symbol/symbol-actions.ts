import { WithoutId } from 'lib/type-utils';
import { Style, Symbol } from 'state/types';

export const CREATE_SYMBOLS = '[SYMBOLS] Create' as const;
export const EDIT_SYMBOLS_STYLE = '[SYMBOLS] Edit Style' as const;

export const createSymbols = (
  payload: Array<{
    parentId: string;
    symbolId?: string;
    styles?: Symbol['styles'];
    symbol?: WithoutId<Symbol>;
  }>
) => ({ type: CREATE_SYMBOLS, payload });
export type CreateSymbols = ReturnType<typeof createSymbols>;

export const editSymbolsStyle = (
  payload: Array<{
    symbolId: string;
    layoutId: string;
    style: WithoutId<Style>;
  }>
) => ({ type: EDIT_SYMBOLS_STYLE, payload });
export type EditSymbolsStyle = ReturnType<typeof editSymbolsStyle>;
