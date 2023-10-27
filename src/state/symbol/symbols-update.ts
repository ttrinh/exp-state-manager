import { Without } from 'lib/type-utils';
import { Stage, State, Symbol } from 'state/types';

type SymbolsUpdatePayload = Array<{
  symbolId: string;
  partialSymbol:
    | Without<Symbol, 'id' | 'type' | 'styles' | 'interactions' | 'timeline'>
    | Without<Stage, 'children'>;
}>;

/**
 * Shallowly update multiple symbols' values
 */
export function symbolsUpdate(draft: State, payload: SymbolsUpdatePayload) {
  payload.forEach(({ symbolId, partialSymbol }) => {
    draft.symbols[symbolId] = {
      ...draft.symbols[symbolId],
      ...partialSymbol,
    };
  });

  return draft;
}
