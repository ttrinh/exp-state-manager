import { create, useStore } from 'zustand';
import { temporal } from 'zundo';
import type { TemporalState } from 'zundo';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { actionMap } from './action-map/middleware';
import { initial } from './initial';
import { stylesUpdate } from './symbol/styles-update';
import { symbolsCreate } from './symbol/symbols-create';
import { symbolsUpdate } from './symbol/symbols-update';
import { uiUpdate } from './ui/ui-update';
import { State } from './types';
import { throttle } from 'lodash';

const ZUNDO_THOTTLE_TIME = 1000; // ms
const ZUNDO_LIMIT = 50;

const campaignActionMap = {
  symbols: {
    create: symbolsCreate,
    update: symbolsUpdate,
    updateStyles: stylesUpdate,
  },
  ui: {
    update: uiUpdate,
  },
};

const storeWithImmer = immer(actionMap(campaignActionMap, initial.state));

const storeWithZundo = temporal(storeWithImmer, {
  limit: ZUNDO_LIMIT,
  handleSet: (handleSet) =>
    throttle<typeof handleSet>((state) => handleSet(state), ZUNDO_THOTTLE_TIME),
});
const storeWithDevtool = devtools(storeWithZundo);

export const useCampaignStore = create(storeWithDevtool);

export const useTemporalStore = <T>(
  selector: (state: TemporalState<State>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useCampaignStore.temporal, selector, equality);

export const campaignActions = useCampaignStore.actions;

/**
 * Zustand's shallow compare prev and next props
 * https://github.com/pmndrs/zustand/blob/main/src/shallow.ts
 */
export { shallow } from 'zustand/shallow';
