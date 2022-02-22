import { Box } from '@mui/system';
import { useEffect } from 'react';

import { dispatch, useStore } from 'state';
import { ButtonsSymbolCreate } from './buttons-symbol-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  const activeStage = useStore((state) => state.ui.activeStage);

  useEffect(() => {
    dispatch({
      type: '[symbol] create symbols',
      payload: [
        {
          parentId: '',
          symbolId: 'stage',
          symbol: {
            type: 'STAGE',
            children: [],
          },
          styles: {
            top: '0',
            left: '0',
            width: '800px',
            height: '800px',
            border: '1px solid white',
          },
        },
      ],
    });
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

      <Symbol id={activeStage ?? ''} />
    </Box>
  );
};
