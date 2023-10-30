import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { memo } from 'react';
import { SunDim, Moon } from '@phosphor-icons/react';

const ThemeSwitchCom = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label="Switch theme">
      <IconButton
        aria-label="Theme toggle"
        size="sm"
        variant="ghost"
        background="transparent"
        border="transparent"
        color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
        icon={colorMode === 'dark' ? <SunDim /> : <Moon />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export const ThemeSwitch = memo(ThemeSwitchCom);
