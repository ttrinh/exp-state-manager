import { Button, ButtonGroup } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Crop54Icon from '@mui/icons-material/Crop54';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { createSymbols } from 'state/symbol/symbol-actions';

const createButtons = [
  {
    label: 'create Text symbol',
    icon: TextFieldsIcon,
    onClick: () => {
      createSymbols([{ type: 'TEXT', id: 'text-one' }]);
    },
  },
  {
    label: 'create Image symbol',
    icon: AddPhotoAlternateIcon,
    onClick: () => {
      createSymbols([{ type: 'IMAGE', id: 'image-one' }]);
    },
  },
  {
    label: 'create Box symbol',
    icon: Crop54Icon,
    onClick: () => {
      createSymbols([{ type: 'RECT', id: 'rect-one' }]);
    },
  },
];

export const ButtonsSymbolCreate = () => {
  return (
    <ButtonGroup variant="outlined" aria-label="symbol create bar">
      {createButtons.map((b) => (
        <Button
          key={b.label}
          onClick={b.onClick}
          color="inherit"
          aria-label={b.label}
        >
          <b.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
};
