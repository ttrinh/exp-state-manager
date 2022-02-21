import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useStore } from 'state-zustand';

import { ButtonsSymbolCreate } from './buttons-symbol-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  const activeStage = useStore((state) => state.ui.activeStage);
  const createSymbol = useStore((state) => state.createSymbol);

  useEffect(() => {
    createSymbol('stage', undefined, {
      top: '0',
      left: '0',
      width: '800px',
      height: '800px',
      border: '1px solid white',
    });
  }, [createSymbol]);

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

      <Symbol id={activeStage ?? ''} />
    </Box>
  );
};
