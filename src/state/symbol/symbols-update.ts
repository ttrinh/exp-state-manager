import { Draft } from 'immer';

import { Symbol } from 'state/types';
import { Without } from 'lib/type-utils';
import { makeAction } from 'state/state-utils/make-action';

type SymbolsUpdatePayload = Array<{
  symbolId: string;
  partialSymbol: Without<Symbol, 'id' | 'styles' | 'type' | 'children'>;
}>;

export const symbolsUpdate = makeAction<SymbolsUpdatePayload>({
  type: '[SYMBOLS] Update',
  processor: (draft, payload) => {
    payload.forEach(({ symbolId, partialSymbol }) => {
      draft.symbols[symbolId] = {
        ...draft.symbols[symbolId],
        ...partialSymbol,
      } as Draft<Symbol>;
    });
  },
});
