import { IconButton, VStack } from '@chakra-ui/react';
import { Style, Symbol } from 'state/types';
import { campaignActions } from 'state/use-store';
import { TextT, Image, Rectangle } from '@phosphor-icons/react';

const commonStyles = {
  id: '',
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
      content: 'Text',
    },
    icon: TextT,
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
    icon: Image,
  },
  {
    label: 'Box',
    style: {
      ...commonStyles,
      top: '80px',
      left: '80px',
      background: 'orange',
    },
    icon: Rectangle,
  },
];

export const ButtonsSymbolCreate = () => {
  const createSymbol = (type: string, style: Style) => () => {
    campaignActions.symbols.create([
      {
        parentId: 'stage',
        symbol: {
          id: '',
          type: type as Symbol['type'],
          styles: {},
        },
        baseStyle: style,
      },
    ]);
  };

  return (
    <VStack align="stretch" px="2" py="20" spacing="5" pl="18">
      {createButtons.map((b) => (
        <IconButton
          key={b.label}
          size="sm"
          color="inherit"
          variant="ghost"
          icon={<b.icon size="24" />}
          onClick={createSymbol(b.label, b.style)}
          aria-label={b.label}
        />
      ))}
    </VStack>
  );
};
