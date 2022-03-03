import { Draft } from 'immer';

import { generateId } from 'lib/generate-id';
import { initial } from 'state';
import { Symbol } from 'state/types';
import { WithoutId } from 'lib/type-utils';
import { makeAction } from 'state/state-utils/make-action';

const SYMBOLS_CREATE = '[SYMBOLS] Create' as const;

type SymbolsCreatePayload = Array<{
  parentId: string;
  symbolId?: string;
  styles?: Symbol['styles'];
  symbol?: WithoutId<Symbol>;
}>;

export const symbolsCreate = makeAction<
  typeof SYMBOLS_CREATE,
  SymbolsCreatePayload
>({
  type: SYMBOLS_CREATE,
  processor: (draft, payload) => {
    payload.forEach(
      ({
        symbolId,
        symbol = initial.symbol,
        styles = initial.style,
        parentId,
      }) => {
        // create symbol & styles
        const id = symbolId ?? generateId('symbol');
        const s = styles as Draft<Symbol['styles']>;
        draft.symbols[id] = { id, ...symbol, styles: s };

        // append into parent
        if (parentId) {
          const prevChildren = draft.symbols[parentId].children ?? [];
          draft.symbols[parentId].children = prevChildren.concat(id);
        }
      }
    );
  },
});
