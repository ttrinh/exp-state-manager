import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { isGroupType } from 'state/type-check';
import { Stage, State, Symbol } from 'state/types';

export type SymbolsCreatePayload = Array<{
  parentId: string;
  // styles?: Symbol['styles'];
  symbol?: Symbol | Stage;
}>;

export function symbolsCreate(draft: State, payload: SymbolsCreatePayload) {
  payload.forEach(({ symbol = initial.symbol, parentId }) => {
    // create symbol & styles
    const id = symbol.id || generateId('symbol');
    const styles = symbol.styles ?? {
      base: { ...initial.style, id: 'base' },
    };

    draft.symbols[id] = {
      ...symbol,
      id,
      styles,
    };

    // append into parent
    if (parentId) {
      const parent = draft.symbols[parentId];
      if (isGroupType(parent)) {
        const prevChildren = parent?.children ?? [];
        parent.children = prevChildren.concat(id);
      }
    }
  });

  return draft;
}
