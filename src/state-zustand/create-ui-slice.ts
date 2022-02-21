import produce from 'immer';

import { Produce, StoreSlice } from './use-store';

export interface UI {
  activeStage: string;
  selectedSymbols: string[];
}

export interface UIStore {
  ui: UI;
  // editUI: (partialUI: Partial<UI>) => void;
  // resetUI: () => void;
}

export const defaultUI: UI = {
  activeStage: 'stage',
  selectedSymbols: [],
};

export const createUISlice: StoreSlice<UIStore> = (set) => ({
  ui: defaultUI,

  // /** Edit existing ui */
  // editUI: (partialUI) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.ui = {
  //         ...prev.ui,
  //         ...partialUI,
  //       };
  //     })
  //   ),

  // /** Completely remove ui */
  // resetUI: () =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.ui = defaultUI;
  //     })
  //   ),
});
