import { Draft } from 'immer';

import { Symbol } from 'state/types';
import { Without } from 'lib/type-utils';
import { makeAction } from 'state/state-utils/make-action';

const SYMBOLS_UPDATE = '[SYMBOLS] Update' as const;

type SymbolsUpdatePayload = Array<{
  symbolId: string;
  partialSymbol: Without<Symbol, 'id' | 'styles' | 'type' | 'children'>;
}>;

export const symbolsUpdate = makeAction<
  typeof SYMBOLS_UPDATE,
  SymbolsUpdatePayload
>({
  type: SYMBOLS_UPDATE,
  processor: (draft, payload) => {
    payload.forEach(({ symbolId, partialSymbol }) => {
      draft.symbols[symbolId] = {
        ...draft.symbols[symbolId],
        ...partialSymbol,
      } as Draft<Symbol>;
    });
  },
});
