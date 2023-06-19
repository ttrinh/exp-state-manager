import { DeepPartial } from '@chakra-ui/react';
import { generateId } from 'lib/generate-id';
import { WithoutId } from 'lib/type-utils';
import { initial } from 'state/initial';
import { State, Symbol } from 'state/types';

export type SymbolsCreatePayload = Array<{
  parentId: string;
  symbolId?: string;
  // styles?: Symbol['styles'];
  symbol?: WithoutId<Symbol>;
}>;

export function symbolsCreate(draft: State, payload: SymbolsCreatePayload) {
  payload.forEach(({ symbolId, symbol = initial.symbol, parentId }) => {
    // create symbol & styles
    const id = symbolId ?? generateId('symbol');
    const styles = symbol.styles ?? {
      base: { id: 'base', ...initial.style },
    };
    draft.symbols[id] = { id, ...symbol, styles };

    // append into parent
    if (parentId) {
      const parent = draft.symbols[parentId];
      const prevChildren = parent?.children ?? [];
      draft.symbols[parentId].children = prevChildren.concat(id);
    }
  });

  return draft;
}
