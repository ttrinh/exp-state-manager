import { actionMap } from './action-map/middleware';
import { appInit } from './app-init';
import { create, useStore as useZustandStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { initial } from './initial';
import { layoutsCreate } from './layout/layouts-create';
import { layoutsDelete } from './layout/layouts-delete';
import { State } from './types';
import { stylesApplyByLayout } from './symbol/styles-apply-by-layout';
import { stylesUpdate } from './symbol/styles-update';
import { symbolsCreate } from './symbol/symbols-create';
import { symbolsUpdate } from './symbol/symbols-update';
import { temporal } from 'zundo';
import { throttle } from 'lodash';
import { uiUpdate } from './ui/ui-update';
import type { TemporalState } from 'zundo';

const ZUNDO_THOTTLE_TIME = 1000; // ms
const ZUNDO_LIMIT = 50;

const campaignActionMap = {
  symbols: {
    create: symbolsCreate,
    update: symbolsUpdate,
    updateStyles: stylesUpdate,
    applyStyles: stylesApplyByLayout,
  },
  layouts: {
    create: layoutsCreate,
    delete: layoutsDelete,
  },
  ui: {
    update: uiUpdate,
  },
  app: {
    init: appInit,
  },
};

const storeWithImmer = immer(actionMap(campaignActionMap, initial.state));

const storeWithZundo = temporal(storeWithImmer, {
  limit: ZUNDO_LIMIT,
  handleSet: (handleSet) =>
    throttle<typeof handleSet>((state) => handleSet(state), ZUNDO_THOTTLE_TIME),
});
const storeWithDevtool = devtools(storeWithZundo);

export const useStore = create(storeWithDevtool);

export const useTemporalStore = <T>(
  selector: (state: TemporalState<State>) => T,
  equality?: (a: T, b: T) => boolean
) => useZustandStore(useStore.temporal, selector, equality);

export const actions = useStore.actions;

/**
 * Zustand's shallow compare prev and next props
 * https://github.com/pmndrs/zustand/blob/main/src/shallow.ts
 */
export { shallow } from 'zustand/shallow';
