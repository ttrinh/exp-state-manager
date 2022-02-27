import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useStore, actions } from 'state';
import { ButtonsSymbolCreate } from './buttons-symbol-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
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
            border: '1px solid white',
          },
        },
      },
    ]);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <ButtonsSymbolCreate />
      </Box>

      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Symbol id={activeStage ?? ''} />
      </div>
    </Box>
  );
};
