import { useEffect } from 'react';

import { useStore, actions } from 'state';
import { SymbolsCreatePayload } from 'state/symbol/symbols-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  // const activeStage = useStore((state) => state.ui.activeStage);
  const activeStage = useStore((state) => state.ui.activeStage);

  useEffect(() => {
    actions.symbols.create([
      {
        parentId: '',
        symbolId: 'stage',
        symbol: {
          type: 'STAGE',
          children: [],
          styles: {},
        },
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
    ]);

    const mockSymbols = Array.from({ length: 1000 }, (_, i) => i + 1).map((i) =>
      generateSymbol(i * 20, i * 5)
    );
    actions.symbols.create(mockSymbols);
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
      type: 'IMAGE',
      styles: {},
    },
    styles: {
      base: {
        id: 'base',
        top: `${top}px`,
        left: `${left}px`,
        width: '150px',
        height: '100px',
        border: '1px solid black',
        background: 'url(https://picsum.photos/200)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
    },
  };
};
