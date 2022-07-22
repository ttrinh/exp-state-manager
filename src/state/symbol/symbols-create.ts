import { Draft } from 'immer';

import { generateId } from 'lib/generate-id';
import { initial } from 'state';
import { Symbol } from 'state/types';
import { WithoutId } from 'lib/type-utils';
import { makeAction } from 'state/state-utils/make-action';

export type SymbolsCreatePayload = Array<{
  parentId: string;
  symbolId?: string;
  styles?: Symbol['styles'];
  symbol?: WithoutId<Symbol>;
}>;

export const symbolsCreate = makeAction<SymbolsCreatePayload>({
  type: '[SYMBOLS] Create',
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
          const parent = draft.symbols[parentId];
          const prevChildren = parent?.children ?? [];
          draft.symbols[parentId].children = prevChildren.concat(id);
        }
      }
    );
  },
});
