import { Box } from '@mui/system';
import { ButtonsSymbolCreate } from './buttons-symbol-create';

export const Pasteboard = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        bgcolor: 'grey.200',
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
    </Box>
  );
};
