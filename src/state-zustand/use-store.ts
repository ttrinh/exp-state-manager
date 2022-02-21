import create, { GetState, SetState } from 'zustand';

import { createStylesSlice, StylesStore } from './create-styles-slice';
import { createSymbolsSlice, SymbolsStore } from './create-symbols-slice';
import { createUISlice, UIStore } from './create-ui-slice';

export { defaultSymbol } from './create-symbols-slice';
export { defaultStyles } from './create-styles-slice';
export { defaultUI } from './create-ui-slice';

export type Store = StylesStore & SymbolsStore & UIStore;
export type StoreSlice<T> = (set: SetState<Store>, get: GetState<Store>) => T;
export type Produce = (store: Store) => void;

// https://github.com/pmndrs/zustand/issues/508
export const useStore = create<Store>((set, get) => ({
  ...createStylesSlice(set, get),
  ...createSymbolsSlice(set, get),
  ...createUISlice(set, get),
}));

// export const defaultStore: Store = {
//   symbols: {},
//   styles: {},
//   ui: defaultUI,
// };
