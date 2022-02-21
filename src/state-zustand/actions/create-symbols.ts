import { Draft } from 'immer';

import { generateId } from 'lib/generate-id';
import { WithoutId } from 'lib/type-utils';
import {
  State,
  defaultStyles,
  defaultSymbol,
  Style,
  Symbol,
} from '../use-store';

export type CreateSymbolsPayload = Array<{
  symbolId?: string;
  symbol?: WithoutId<Symbol>;
  styles: WithoutId<Style>;
}>;

export const createSymbols = (
  draft: Draft<State>,
  payload: CreateSymbolsPayload
) => {
  payload.forEach(
    ({ symbolId, symbol = defaultSymbol, styles = defaultStyles }) => {
      const id = symbolId ?? generateId('symbols');
      draft.symbols[id] = { id, ...symbol };
      // @ts-ignore
      draft.styles[id] = { id, ...styles };
    }
  );
};
