import produce from 'immer';

import { Produce, StoreSlice } from './use-store';
import { generateId } from 'lib/generate-id';
import { WithoutId } from 'lib/type-utils';
import { defaultStyles, Styles } from './create-styles-slice';

export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'RECT';

export interface Symbol {
  id: string;
  type: SymbolTypes;
  children?: string[];
}

export interface SymbolsStore {
  symbols: Record<string, Symbol>;
  // createSymbol: (
  //   id?: string,
  //   partialSymbol?: WithoutId<Symbol>,
  //   partialStyles?: WithoutId<Styles>
  // ) => void;
  // editSymbol: (id: string, partialSymbol: WithoutId<Symbol>) => void;
  // setSymbol: (id: string, partialSymbol: WithoutId<Symbol>) => void;
  // deleteSymbol: (id: string) => void;
  // resetSymbols: () => void;
}

export const defaultSymbol: WithoutId<Symbol> = {
  type: 'TEXT',
};

export const createSymbolsSlice: StoreSlice<SymbolsStore> = (set) => ({
  symbols: {},

  // /** Create a brand new symbol */
  // createSymbol: (
  //   symbolId,
  //   partialSymbol = defaultSymbol,
  //   partialStyles = defaultStyles
  // ) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       const id = symbolId ?? generateId('symbols');
  //       prev.symbols[id] = { id, ...partialSymbol };
  //       prev.styles[id] = { id, ...partialStyles };
  //     })
  //   ),

  // /** Edit existing symbol */
  // editSymbol: (id, partialSymbol) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.symbols[id] = {
  //         ...prev.symbols[id],
  //         ...partialSymbol,
  //       };
  //     })
  //   ),

  // /** Set symbol */
  // setSymbol: (id, partialSymbol) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.symbols[id] = { id, ...partialSymbol };
  //     })
  //   ),

  // /** Completely remove symbol */
  // deleteSymbol: (id: string) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       delete prev.symbols[id];
  //     })
  //   ),

  // /** Completely reset all symbols */
  // resetSymbols: () =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.symbols = {};
  //     })
  //   ),
});
