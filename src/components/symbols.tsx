import { Box } from '@mui/system';
// import { useRecoilValue } from 'recoil';
import { symbolState } from 'state/symbol/symbol-state';

export const Symbols = () => {
  const keys = symbolState.getModuleKeys();
  // const d = useRecoilValue(symbolState.getModuleKeys);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {keys.toString()}
    </Box>
  );
};
