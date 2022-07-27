/**
 * @file Zustand middleware to easily tie actions to state.
 *
 * Usage:
 * ```typescript
 * import create from 'zustand';
 * import { Draft } from 'immer';
 *
 * type YourState = {
 *   userIds: string[];
 *   favoriteColor: string;
 * }
 *
 * const setFavoriteColor = (state: Draft<State>, payload: { color: string }) => {
 *     state.favoriteColor = payload.color;
 * }
 *
 * const actionMap = {
 *     color: {
 *         favorite: setFavoriteColor
 *     },
 * };
 *
 * const initialState = {
 *     userIds: [],
 *     favoriteColor: '#0000ff',
 * };
 *
 * const useStore = create(
 *     actionMap(
 *         yourActionMap,
 *         initialState
 *     )
 * );
 *
 * // Your action map is now part of the Zustand store.
 * const actions = useStore().actions;
 *
 * // Matches signature of original `setFavoriteColor` function,
 * // but it is now tied to Zustand store.
 * actions.color.favorite({ color: '#ff0000' });
 * ```
 */

import type { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand';
import {
  ActionMap,
  AnyActionMap,
  wrapActionMap,
  WrappedActionMap,
} from './action-map';

type MergeRight<T extends object, U extends object> = Omit<T, keyof U> & U;

/**
 * Prefer left-hand type if it extends the right-hand type.
 * Otherwise, cast as the right-hand type.
 */
type Cast<T, U> = T extends U ? T : U;

/**
 * The additional state added by this middleware.
 */
type ActionMapState<AM extends AnyActionMap> = {
  actions: StoreActionMap<AM>['actions'];
};

/**
 * Additional property added to the Zustand store.
 */
type StoreActionMap<AM extends AnyActionMap> = {
  actions: WrappedActionMap<AM>;
};

/**
 * Extend an object with with the wrapped actions.
 */
type WithActionMap<S, AM> = MergeRight<
  Cast<S, object>,
  StoreActionMap<Cast<AM, ActionMap<Cast<S, object>>>>
>;

type ActionMapMiddleware = <
  S extends object,
  AM extends ActionMap<S>,
  Cms extends [StoreMutatorIdentifier, unknown][] = []
>(
  actionMap: AM,
  initialState: S
) => StateCreator<MergeRight<S, ActionMapState<AM>>, Cms, [['actionMap', AM]]>;

/**
 * Inform Zustand of the modifications this middleware makes to the store.
 */
declare module 'zustand' {
  interface StoreMutators<S, A> {
    actionMap: WithActionMap<S, A>;
  }
}

/**
 * Return a function type without the last argument.
 */
type PopArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never;

/**
 * S - State
 * AM - Action Map
 */
type ActionMapImpl = <S extends object, AM extends ActionMap<S>>(
  actionMap: AM,
  initialState: S
) => PopArgument<StateCreator<S & ActionMapState<AM>, [], []>>;

const actionMapImpl: ActionMapImpl =
  (actionMap, initialState) => (set, _get, _api) => {
    type S = typeof initialState;

    return {
      actions: wrapActionMap(actionMap, set as StoreApi<S>['setState']),
      ...initialState,
    };
  };

export const actionMap = actionMapImpl as ActionMapMiddleware;
