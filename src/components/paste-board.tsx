import { Box } from '@mui/system';
import { useEffect } from 'react';
import { actions } from 'state/action-processors';

import { ButtonsSymbolCreate } from './buttons-symbol-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  useEffect(() => {
    actions.symbols.create([{ id: 'stage', type: 'STAGE', children: [] }]);
  }, []);

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

      <Symbol id="stage" />
    </Box>
  );
};
