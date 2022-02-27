import { Button, ButtonGroup } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Crop54Icon from '@mui/icons-material/Crop54';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { dispatch } from 'state';

const createButtons = [
  {
    label: 'create Text symbol',
    icon: TextFieldsIcon,
  },
  {
    label: 'create Image symbol',
    icon: AddPhotoAlternateIcon,
  },
  {
    label: 'create Box symbol',
    icon: Crop54Icon,
  },
];

export const ButtonsSymbolCreate = () => {
  const createSymbol = () => {
    dispatch({
      type: '[SYMBOLS] Create',
      payload: [
        {
          styles: {
            base: {
              id: 'base',
              top: '40px',
              left: '40px',
              width: '100px',
              height: '100px',
              background: 'orange',
            },
          },
          parentId: 'stage',
        },
      ],
    });
  };

  return (
    <ButtonGroup variant="outlined" aria-label="symbol create bar">
      {createButtons.map((b) => (
        <Button
          key={b.label}
          onClick={createSymbol}
          color="inherit"
          aria-label={b.label}
        >
          <b.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
};
