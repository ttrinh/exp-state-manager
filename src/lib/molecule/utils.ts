import { GetRecoilValue, SetRecoilState, RecoilState } from "recoil";

/**
 * Recoil helper to compare and set when new value differs from old value
 */
export const compareAndSet =
  (get: GetRecoilValue, set: SetRecoilState) =>
  <T>(state: RecoilState<T>, newValue: T) => {
    const oldValue = get(state);
    if (oldValue !== newValue) {
      set(state, newValue);
    }
  };
