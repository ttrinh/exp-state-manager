import { Box, ChakraProvider, Stack } from '@chakra-ui/react';

import { Pasteboard } from 'components/paste-board';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box sx={{ flex: '0 0 30px' }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          height="100%"
          padding="0 1rem"
          fontSize="12px"
        >
          <b>File</b>
          <b>Edit</b>
        </Stack>
      </Box>
      <Box sx={{ flex: '1' }}>
        <Pasteboard />
      </Box>
    </Box>
  );
}

function ThemeToggle() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

export default ThemeToggle;
