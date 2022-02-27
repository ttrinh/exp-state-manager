import { Button, ButtonGroup } from '@chakra-ui/react';
import { dispatch } from 'state';

const createButtons = [
  {
    label: 'Text',
    // icon: TextFieldsIcon,
  },
  {
    label: 'Image',
    // icon: AddPhotoAlternateIcon,
  },
  {
    label: 'Box',
    // icon: Crop54Icon,
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
          {b.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
