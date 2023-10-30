import { generateId } from 'lib/generate-id';
import { WithoutId } from 'lib/type-utils';
import { initial } from 'state/initial';
import { isGroupType } from 'state/type-check';
import { Stage, State, Style, Symbol } from 'state/types';

export type SymbolsCreatePayload = Array<{
  parentId: string;
  symbol?: Symbol | Stage;
  /** base styles for all layouts */
  baseStyle?: WithoutId<Style>;
}>;

export function symbolsCreate(draft: State, payload: SymbolsCreatePayload) {
  payload.forEach(({ symbol = initial.symbol, parentId, baseStyle = {} }) => {
    // create symbol & styles
    const id = symbol.id || generateId('symbol');
    const layoutIds = Object.keys(draft.layouts);
    const styles = layoutIds.reduce((acc, layoutId) => {
      const predefinedStyles = symbol.styles[layoutId] ?? {};
      return {
        ...acc,
        [layoutId]: {
          ...initial.style,
          ...baseStyle,
          ...predefinedStyles,
        },
      };
    }, {});

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
