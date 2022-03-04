import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { memo } from 'react';
import { VscColorMode as IconTheme } from 'react-icons/vsc';

const ThemeSwitchCom = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label="Switch theme">
      <IconButton
        aria-label="Theme toggle"
        variant="ghost"
        background="transparent"
        border="transparent"
        color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
        icon={<IconTheme />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export const ThemeSwitch = memo(ThemeSwitchCom);
