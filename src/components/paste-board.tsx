import { useEffect } from 'react';

import { SymbolsCreatePayload } from 'state/symbol/symbols-create';
import { campaignActions, useCampaignStore } from 'state/use-store';
import { Symbol } from './symbol';

const generateSymbol = (
  left: number,
  top: number,
  hue: number
): SymbolsCreatePayload[0] => {
  return {
    parentId: 'stage',
    symbol: {
      type: 'BOX',
      styles: {
        base: {
          id: 'base',
          top: `${top}px`,
          left: `${left}px`,
          width: '50px',
          height: '50px',
          border: '1px solid black',
          background: `hsl(${hue}, 100%, 75%)`,
          borderRadius: '5px',
        },
      },
    },
  };
};

const mockSymbols = Array.from({ length: 500 }, (_, i) => i + 1).map((i) => {
  const hue = i % 360;
  return generateSymbol(i * 10, i * 5, hue);
});

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
              width: '600px',
              height: '600px',
              border: '1px solid black',
            },
          },
        },
      },
    ]);

    campaignActions.symbols.create(mockSymbols);
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
