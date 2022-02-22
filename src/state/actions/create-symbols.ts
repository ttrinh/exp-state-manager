import { Draft } from 'immer';

import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { State } from '../use-store';
import { Style, Symbol } from 'state/types';
import { WithoutId } from 'lib/type-utils';

// PAYLOAD
export type CreateSymbolsPayload = Array<{
  parentId: string;
  styles: WithoutId<Style>;
  symbolId?: string;
  symbol?: WithoutId<Symbol>;
}>;

// // ACTION
// export const createSymbols = (payload: CreateSymbolsPayload) =>
//   dispatch({
//     type: CREATE_SYMBOLS,
//     payload,
//   });
// export type CreateSymbols = ReturnType<typeof createSymbols>;

// PROCESS
export const createSymbolsProcess = (
  draft: Draft<State>,
  payload: CreateSymbolsPayload
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
      draft.symbols[id] = { id, ...symbol };
      draft.styles[id] = { id, ...styles } as Draft<Style>;

      // append into parent
      if (parentId) {
        const prevChildren = draft.symbols[parentId].children ?? [];
        draft.symbols[parentId].children = prevChildren.concat(id);
      }
    }
  );
};
