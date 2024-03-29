import { IconButton, VStack } from '@chakra-ui/react';
import { Style, Symbol } from 'state/types';
import { actions } from 'state/use-store';
import { TextT, Image, Rectangle } from '@phosphor-icons/react';
import { memo } from 'react';

const commonStyles = {
  id: '',
  top: '40px',
  left: '40px',
  width: '150px',
  height: '100px',
};

const createButtons = [
  {
    label: 'text',
    style: {
      ...commonStyles,
      border: '1px solid blue',
      background: 'gray',
      content: 'Text',
    },
    icon: TextT,
  },
  {
    label: 'image',
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
    label: 'box',
    style: {
      ...commonStyles,
      top: '80px',
      left: '80px',
      background: 'orange',
    },
    icon: Rectangle,
  },
];

const ButtonsSymbolCreateCom = () => {
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

export const ButtonsSymbolCreate = memo(ButtonsSymbolCreateCom);

const createSymbol = (type: string, style: Style) => () => {
  actions.symbols.create([
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
