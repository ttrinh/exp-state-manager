import type { NamedSet } from 'zustand/middleware/devtools';

/************************************************
 *
 * Action Processors
 *
 ************************************************/

/**
 * A function that takes a State object and Payload,
 * and returns an updated State.
 */
export type ActionProcessor<State extends object> = (state: State) => State;

export type ActionWithPayloadProcessor<State extends object, Payload> = (
  state: State,
  payload: Payload
) => State;

/**
 * Action Processor for any combination of State and Payload.
 */
export type AnyActionProcessor =
  | ActionProcessor<any>
  | ActionWithPayloadProcessor<any, any>;

/**
 * An Action Map that acts on the given State shape.
 */
export type ActionProcessorForState<State extends object> =
  | ActionProcessor<State>
  | ActionWithPayloadProcessor<State, any>;

/************************************************
 *
 * Action Maps
 *
 ************************************************/

/**
 * A map of Action Processors for a given State shape.
 */
export interface ActionMap<State extends object> {
  [index: string]: ActionProcessorForState<State> | ActionMap<State>;
}

/**
 * An Action Map for any State shape.
 */
export type AnyActionMap = ActionMap<any>;

/************************************************
 *
 * Wrapped Action Maps.
 *
 ************************************************/

/**
 * An Action Map that has been wrapped in calls to the Zustand store.
 */
export type WrappedActionMap<AM extends AnyActionMap> = {
  [K in keyof AM]: WrappedActionMapPiece<AM[K]>;
};

/**
 * A single entry of an ActionMap that has been wrapped in a call(s) to the Zustand store.
 */
type WrappedActionMapPiece<T> = T extends AnyActionProcessor
  ? WrappedActionProcessor<T>
  : T extends AnyActionMap
  ? WrappedActionMap<T>
  : never;

/**
 * An Action Processor that has been wrapped in a call to Zustand store.
 */
type WrappedActionProcessor<T> = T extends ActionProcessor<any>
  ? () => void
  : T extends ActionWithPayloadProcessor<any, infer P>
  ? (payload: P) => void
  : never;

/************************************************
 *
 * Implementation
 *
 ************************************************/

/**
 * Take an Action Map and recursively wrap Action Processors
 * in calls to the Zustand store.
 */
export function wrapActionMap<S extends object, AM extends ActionMap<S>>(
  actionMap: AM,
  set: NamedSet<S>,
  basePath?: string
): WrappedActionMap<AM> {
  const wrappedActionMap: any = {};

  Object.entries(actionMap).forEach(([key, actionMapOrProcessor]) => {
    const actionPath = basePath ? [basePath, key].join('/') : key;

    if (typeof actionMapOrProcessor === 'function') {
      type ActionProcessorPayload = Parameters<typeof actionMapOrProcessor>[1];

      wrappedActionMap[key] = (payload: ActionProcessorPayload) => {
        // This will be reported to the Redux devtools.
        const reduxAction = {
          type: actionPath,
          payload,
        };

        set(
          (currentState) => actionMapOrProcessor(currentState, payload),
          false,
          reduxAction
        );
      };
    } else {
      wrappedActionMap[key] = wrapActionMap(
        actionMapOrProcessor,
        set,
        actionPath
      );
    }
  });

  return wrappedActionMap as unknown as WrappedActionMap<AM>;
}
