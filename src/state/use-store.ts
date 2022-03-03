import create from 'zustand';
import { devtools, redux } from 'zustand/middleware';

import { makeDispatchableActions, reducer } from './action-reducer';
import { initial } from './initial';

export const useStore = create(devtools(redux(reducer, initial.state)));
export const dispatch = useStore.dispatch;
export const actions = makeDispatchableActions(dispatch);
