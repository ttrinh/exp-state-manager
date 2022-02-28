import { Draft } from 'immer';

import { CreateSymbols, EditSymbolsStyle } from './symbol-actions';
import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { Processor, Symbol, Style } from 'state/types';
import { cleanObject } from 'lib/clean-object';

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

export const editSymbolsStyleProcess: Processor<EditSymbolsStyle['payload']> = (
  draft,
  payload
) => {
  payload.forEach(({ symbolId, layoutId, style }) => {
    const prevStyle = draft.symbols[symbolId].styles[layoutId];
    const s = cleanObject(style);

    draft.symbols[symbolId].styles[layoutId] = {
      ...prevStyle,
      ...s,
    } as Draft<Style>;
  });
};
