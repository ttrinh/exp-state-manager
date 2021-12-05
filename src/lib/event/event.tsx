import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export interface ActionObject<T, K> {
  type: T;
  data: K;
}

interface EventRootProps {
  scope?: string;
  actionProcessor: (props: any, e: CustomEvent<any>) => void;
}

export const EventRoot = ({
  scope = 'root',
  actionProcessor,
}: EventRootProps) => {
  const actions = useRecoilCallback(
    (...props) =>
      (<T,>(e: CustomEvent<T>) => {
        return actionProcessor(props, e);
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
