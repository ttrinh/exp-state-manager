// TODO: Update zundo for Zustand v4.
// import { create } from 'zundo';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import shallowCompare from 'zustand/shallow';
import { actionMap } from './action-map/middleware';
import { initial } from './initial';
import { stylesUpdate } from './symbol/styles-update';
import { symbolsCreate } from './symbol/symbols-create';
import { symbolsUpdate } from './symbol/symbols-update';
import { uiUpdate } from './ui/ui-update';

const actions = {
  symbols: {
    create: symbolsCreate,
    update: symbolsUpdate,
    updateStyles: stylesUpdate,
  },
  ui: {
    update: uiUpdate,
  },
};

export const useStore = create(
  devtools(immer(actionMap(actions, initial.state)))
);

export function useActions() {
  return useStore((state) => state.actions);
}

/**
 * Zustand's shallow compare prev and next props
 * https://github.com/pmndrs/zustand/blob/main/src/shallow.ts
 */
export const shallow = shallowCompare;
