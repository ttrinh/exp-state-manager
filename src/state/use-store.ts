import { create } from 'zundo';
import { devtools, redux } from 'zustand/middleware';
import shallowCompare from 'zustand/shallow';

import { makeDispatchableActions, reducer } from './action-reducer';
import { initial } from './initial';

const reduxState = devtools(redux(reducer, initial.state));
// @ts-ignore - Zundo typing https://github.com/charkour/zundo/issues/21
export const useStore = create(reduxState, {
  coolOffDurationMs: 500,
  historyDepthLimit: 30,
});
/**
 * Action dispatch
 */
// @ts-ignore
export const dispatch = useStore.dispatch;

/**
 * Collection of organized actions
 */
export const actions = makeDispatchableActions(dispatch);

/**
 * Zustand's shallow compare prev and next props
 * https://github.com/pmndrs/zustand/blob/main/src/shallow.ts
 */
export const shallow = shallowCompare;
