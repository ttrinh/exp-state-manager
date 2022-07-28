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

export const useCampaignStore = create(
  devtools(immer(actionMap(campaignActionMap, initial.state)))
);

export const campaignActions = useCampaignStore.actions;

/**
 * Zustand's shallow compare prev and next props
 * https://github.com/pmndrs/zustand/blob/main/src/shallow.ts
 */
export const shallow = shallowCompare;
