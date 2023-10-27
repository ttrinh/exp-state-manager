import { campaignActions, useCampaignStore } from 'state/use-store';
import { layout1, layout2, mockStage, mockSymbols } from 'mocks';
import { Symbol } from './symbol';
import { useEffect } from 'react';

export const Pasteboard = () => {
  const activeStage = useCampaignStore((state) => state.ui.activeStage);

  useEffect(() => {
    campaignActions.layouts.create([{ layout: layout1 }, { layout: layout2 }]);
    campaignActions.symbols.create([{ parentId: '', symbol: mockStage }]);
    campaignActions.symbols.create(mockSymbols);
    campaignActions.ui.update({ activeLayout: layout1.id });
  }, []);

  return (
    <div
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
