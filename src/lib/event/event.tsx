import { useEffect } from 'react';
import {
  TransactionInterface_UNSTABLE,
  useRecoilTransaction_UNSTABLE,
} from 'recoil';

export interface ActionObject<T, K> {
  type: T;
  data: K;
}

export type ActionFactory<T> = (
  transactionInterface: TransactionInterface_UNSTABLE,
  actions: T
) => void;

interface EventRootProps {
  scope?: string;
  actionProcessor: ActionFactory<any>;
}

export const EventRoot = ({
  scope = 'root',
  actionProcessor,
}: EventRootProps) => {
  // https://recoiljs.org/docs/api-reference/core/useRecoilTransaction
  const actions = useRecoilTransaction_UNSTABLE(
    (transactionInterface) =>
      (<T,>(e: CustomEvent<T>) => {
        return actionProcessor(transactionInterface, e.detail);
      }) as EventListener,
    [actionProcessor]
  );

  useEffect(() => {
    registerListener(actions);

    return () => {
      removeListener(actions);
    };
  }, [actions]);

  return null;
};

/* Dispatch Event */
export const dispatch = <T, K>(
  actionObject: ActionObject<T, K>
): ActionObject<T, K> => {
  document.body.dispatchEvent(new CustomEvent(ACT, { detail: actionObject }));
  return actionObject;
};

/* Create Event */
const ACT = 'app_actions';
const registerListener = (actionProcessor: EventListener) => {
  document.body.addEventListener(ACT, actionProcessor);
};

const removeListener = (actionProcessor: EventListener) => {
  document.body.removeEventListener(ACT, actionProcessor);
};
