import create from 'zustand';
import { devtools, redux } from 'zustand/middleware';
import shallowCompare from 'zustand/shallow';

import { makeDispatchableActions, reducer } from './action-reducer';
import { initial } from './initial';

export const useStore = create(devtools(redux(reducer, initial.state)));

/**
 * Action dispatch
 */
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
