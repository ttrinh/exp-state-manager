import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { actions } from 'state/action-processors';
import { uiState } from 'state/ui/ui-state';

import { ButtonsSymbolCreate } from './buttons-symbol-create';
import { Symbol } from './symbol';

export const Pasteboard = () => {
  const activeStage = useRecoilValue(uiState.getAtom('activeStage'));

  useEffect(() => {
    actions.symbols.create([{ id: 'stage', type: 'STAGE', children: [] }], {
      top: '0',
      left: '0',
      width: '500px',
      height: '500px',
      border: '1px solid white',
    });
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

      <Symbol id={activeStage ?? ''} />
    </Box>
  );
};
