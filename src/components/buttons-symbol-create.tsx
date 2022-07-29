import { Button, ButtonGroup } from '@chakra-ui/react';
import { Style } from 'state/types';
import { campaignActions } from 'state/use-store';

const commonStyles = {
  id: 'base',
  top: '40px',
  left: '40px',
  width: '150px',
  height: '100px',
};

const createButtons = [
  {
    label: 'Text',
    style: {
      ...commonStyles,

      border: '1px solid blue',
    },
    // icon: TextFieldsIcon,
  },
  {
    label: 'Image',
    style: {
      ...commonStyles,
      top: '60px',
      left: '60px',
      background: 'url(https://picsum.photos/200)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    // icon: AddPhotoAlternateIcon,
  },
  {
    label: 'Box',
    style: {
      ...commonStyles,
      top: '80px',
      left: '80px',
      background: 'orange',
    },
    // icon: Crop54Icon,
  },
];

export const ButtonsSymbolCreate = () => {
  const createSymbol = (style: Style) => {
    campaignActions.symbols.create([
      {
        styles: {
          base: style,
        },
        parentId: 'stage',
      },
    ]);
  };

  return (
    <ButtonGroup variant="outlined" aria-label="symbol create bar">
      {createButtons.map((b) => (
        <Button
          key={b.label}
          onClick={() => createSymbol(b.style)}
          color="inherit"
          aria-label={b.label}
        >
          {b.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
