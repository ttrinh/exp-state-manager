// import { create } from 'zundo';
import create from 'zustand';
import { devtools, redux } from 'zustand/middleware';
import shallowCompare from 'zustand/shallow';

import { makeDispatchableActions, reducer } from './action-reducer';
import { initial } from './initial';

const reduxState = devtools(redux(reducer, initial.state));
export const useStore = create(reduxState);
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
