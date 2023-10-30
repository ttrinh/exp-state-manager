import { campaignActions, useCampaignStore } from 'state/use-store';
import { Symbol } from './symbol';
import { useEffect, useRef } from 'react';
import { getUIValue } from 'state/selectors';

const deselectAll = () => campaignActions.ui.update({ selectedSymbols: [] });

export const Pasteboard = () => {
  const activeStage = useCampaignStore(getUIValue('activeStage'));

  useEffectOnce(campaignActions.app.init);

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
      <Symbol id={activeStage ?? ''} />
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
