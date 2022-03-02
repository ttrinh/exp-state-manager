import { Processor } from './types';

interface MakeAction<T, K> {
  type: T;
  processor: Processor<K>;
}

export const makeAction = <T, K>({ type, processor }: MakeAction<T, K>) => {
  return {
    type,
    action: (payload: K) => ({ type, payload }),
    processor,
    actionDispatch:
      <J>(dispatch: (a: J) => J) =>
      (payload: K) =>
        // @ts-ignore generic to pass down dispatch (which unknown at this point)
        dispatch({ type, payload }),
  };
};
