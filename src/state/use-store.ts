import create from 'zustand';
import { devtools, redux } from 'zustand/middleware';

import { reducer, Action } from './reducer';
import { initial } from './initial';

// Need to look into this
// https://codesandbox.io/s/zustand-immer-redux-forked-q2nkn?file=/src/createStore.ts
export const useStore = create(devtools(redux(reducer, initial.state)));

export const dispatch = (
  useStore as typeof useStore & {
    dispatch: (action: Action) => Action;
  }
).dispatch;
