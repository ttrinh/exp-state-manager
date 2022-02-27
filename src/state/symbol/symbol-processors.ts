import { Draft } from 'immer';

import { CreateSymbols } from './symbol-actions';
import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { Processor, Symbol } from 'state/types';

export const createSymbolsProcess: Processor<CreateSymbols['payload']> = (
  draft,
  payload
) => {
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
};
