import { Button, ButtonGroup } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Crop54Icon from '@mui/icons-material/Crop54';
import IconButton from '@mui/material/IconButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const createButtons = [
  {
    label: 'create Text symbol',
    icon: TextFieldsIcon,
    onClick: () => {
      console.log('clicked Text');
    },
  },
  {
    label: 'create Image symbol',
    icon: AddPhotoAlternateIcon,
    onClick: () => {
      console.log('clicked Image');
    },
  },
  {
    label: 'create Box symbol',
    icon: Crop54Icon,
    onClick: () => {
      console.log('clicked Box');
    },
  },
];

export const ButtonGroupSymbolCreate = () => {
  return (
    <ButtonGroup variant="outlined" aria-label="symbol create bar">
      {createButtons.map((b) => (
        <Button onClick={b.onClick} color="inherit" aria-label={b.label}>
          <b.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
};
