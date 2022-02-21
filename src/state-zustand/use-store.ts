import { WithoutId } from 'lib/type-utils';
import create, { GetState, SetState } from 'zustand';
import { devtools, redux } from 'zustand/middleware';

import { createStylesSlice, StylesStore } from './create-styles-slice';
import { createSymbolsSlice, SymbolsStore } from './create-symbols-slice';
import { createUISlice, UIStore } from './create-ui-slice';
import { reducer, Action } from './reducer';

// export { defaultSymbol } from './create-symbols-slice';
// export { defaultStyles } from './create-styles-slice';
export { defaultUI } from './create-ui-slice';

export type Store = StylesStore & SymbolsStore & UIStore;
export type StoreSlice<T> = (set: SetState<Store>, get: GetState<Store>) => T;
export type Produce = (store: Store) => void;

// https://github.com/pmndrs/zustand/issues/508
// export const useStore = create<Store>((set, get) => ({
//   ...createStylesSlice(set, get),
//   ...createSymbolsSlice(set, get),
//   ...createUISlice(set, get),
// }));

// export const defaultStore: Store = {
//   symbols: {},
//   styles: {},
//   ui: defaultUI,
// };

export interface Style extends Partial<CSSStyleDeclaration> {
  id: string;
}

export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'RECT';

export interface Symbol {
  id: string;
  type: SymbolTypes;
  children?: string[];
}

export interface UI {
  activeStage: string;
  selectedSymbols: string[];
}

export interface State {
  styles: Record<string, Style>;
  symbols: Record<string, Symbol>;
  ui: UI;
}

export const initialState: State = {
  styles: {},
  symbols: {},
  ui: {
    activeStage: 'stage',
    selectedSymbols: [],
  },
};

export const defaultStyles: WithoutId<Style> = {
  top: '0px',
  left: '0px',
  width: '200px',
  height: '100px',
};

export const defaultSymbol: WithoutId<Symbol> = {
  type: 'TEXT',
};

// Need to look into this
// https://codesandbox.io/s/zustand-immer-redux-forked-q2nkn?file=/src/createStore.ts
export const useStore = create(devtools(redux(reducer, initialState)));
export const api = useStore as typeof useStore & {
  dispatch: (action: Action) => Action;
};
