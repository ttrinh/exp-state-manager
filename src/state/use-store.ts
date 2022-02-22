import create from 'zustand';
import { devtools, redux } from 'zustand/middleware';

import { reducer, Action } from './reducer';
import { initial } from './initial';
import { Style, Symbol, UI } from './types';

export interface State {
  styles: Record<string, Style>;
  symbols: Record<string, Symbol>;
  ui: UI;
}

export const initialState: State = {
  styles: {},
  symbols: {},
  ui: initial.ui,
};

// Need to look into this
// https://codesandbox.io/s/zustand-immer-redux-forked-q2nkn?file=/src/createStore.ts
export const useStore = create(devtools(redux(reducer, initialState)));

export const dispatch = (
  useStore as typeof useStore & {
    dispatch: (action: Action) => Action;
  }
).dispatch;
