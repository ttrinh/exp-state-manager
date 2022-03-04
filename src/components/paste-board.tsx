import { useEffect } from 'react';

import { useStore, actions } from 'state';
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
