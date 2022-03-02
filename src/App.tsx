import { Box, ChakraProvider, HStack, VStack } from '@chakra-ui/react';
import { Control } from 'components/control';
import { ControlText } from 'components/control-text';

import { Pasteboard } from 'components/paste-board';

function App() {
  return (
    <VStack justify="stretch" align="stretch" w="100%" h="100%">
      <HStack>
        <Control label="X" styleKey="left" />
        <Control label="Y" styleKey="top" />
        <Control label="W" styleKey="width" />
        <Control label="H" styleKey="height" />
        <ControlText label="Class" symbolKey="className" />
      </HStack>
      <Box sx={{ flex: '1' }}>
        <Pasteboard />
      </Box>
    </VStack>
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
