import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useStore } from 'state-zustand';

import { ButtonsSymbolCreate } from './buttons-symbol-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  const activeStage = useStore((state) => state.ui.activeStage);
  const createStage = useStore((state) => state.createStyles);
  const createSymbol = useStore((state) => state.createSymbol);

  useEffect(() => {
    createSymbol('stage');

    createStage('stage', {
      top: '0',
      left: '0',
      width: '500px',
      height: '500px',
      border: '1px solid white',
    });
  }, [createStage, createSymbol]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <ButtonsSymbolCreate />
      </Box>

      <Symbol id={activeStage ?? ''} />
    </Box>
  );
};
