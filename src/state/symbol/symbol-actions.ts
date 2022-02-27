import { WithoutId } from 'lib/type-utils';
import { Symbol } from 'state/types';

export const CREATE_SYMBOLS = '[SYMBOLS] Create' as const;

export const createSymbols = (
  payload: Array<{
    parentId: string;
    symbolId?: string;
    styles?: Symbol['styles'];
    symbol?: WithoutId<Symbol>;
  }>
) => ({ type: CREATE_SYMBOLS, payload });

export type CreateSymbols = ReturnType<typeof createSymbols>;
