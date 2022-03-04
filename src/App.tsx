import { ChakraProvider } from '@chakra-ui/react';

import Campaign from 'pages/campaign';

function ThemeToggle() {
  return (
    <ChakraProvider>
      <Campaign />
    </ChakraProvider>
  );
}

export default ThemeToggle;
