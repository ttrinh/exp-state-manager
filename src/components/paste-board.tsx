import { actions, useStore } from 'state/use-store';
import { getUIValue } from 'state/selectors';
import { Element } from './element';
import { useEffect, useRef } from 'react';

const deselectAll = () => actions.ui.update({ selectedElements: [] });

export const Pasteboard = () => {
  const activeStage = useStore(getUIValue('activeStage'));

  useEffectOnce(actions.app.init);

  return (
    <div
      onClick={deselectAll}
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.1)',
      }}
    >
      <Element id={activeStage ?? ''} />
    </div>
  );
};

const useEffectOnce = (fn: () => unknown) => {
  const runRef = useRef<boolean>(false);
  useEffect(() => {
    if (!runRef.current) {
      runRef.current = true;
      fn();
    }
  }, []);
};
