import { useEffect } from 'react';

import { SymbolsCreatePayload } from 'state/symbol/symbols-create';
import { campaignActions, useCampaignStore } from 'state/use-store';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  const activeStage = useCampaignStore((state) => state.ui.activeStage);

  useEffect(() => {
    campaignActions.symbols.create([
      {
        parentId: '',
        symbolId: 'stage',
        symbol: {
          type: 'STAGE',
          children: [],
          styles: {
            base: {
              id: 'base',
              top: '0',
              left: '0',
              width: '320px',
              height: '550px',
              border: '1px solid black',
            },
          },
        },
      },
    ]);

    const mockSymbols = Array.from({ length: 1000 }, (_, i) => i + 1).map((i) =>
      generateSymbol(i * 20, i * 5)
    );
    campaignActions.symbols.create(mockSymbols);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
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

const generateSymbol = (left: number, top: number): SymbolsCreatePayload[0] => {
  return {
    parentId: 'stage',
    symbol: {
      type: 'BOX',
      styles: {
        base: {
          id: 'base',
          top: `${top}px`,
          left: `${left}px`,
          width: '150px',
          height: '100px',
          border: '1px solid black',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '5px',
        },
      },
    },
  };
};
