import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';

interface ButtonThemeToggleProps {
  onClick: () => void;
  themeMode: PaletteMode;
}

export const ButtonThemeToggle: FC<ButtonThemeToggleProps> = ({
  onClick,
  themeMode,
}) => {
  return (
    <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
      {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
