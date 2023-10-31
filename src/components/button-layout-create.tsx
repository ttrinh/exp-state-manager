import { Button } from '@chakra-ui/react';
import { generateId } from 'lib/generate-id';
import { actions } from 'state/use-store';
import { Plus } from '@phosphor-icons/react';

export const ButtonLayoutCreate = () => {
  const createLayout = () => {
    const w = randomNumber(100, 500);
    const h = randomNumber(100, 500);

    actions.layouts.create([
      {
        layout: {
          id: generateId('layout'),
          deliverable: 'a',
          name: `${w}x${h}`,
          w: `${w}px`,
          h: `${h}px`,
        },
      },
    ]);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={createLayout}
      leftIcon={<Plus />}
      color="inherit"
    >
      Add a Random Layout
    </Button>
  );
};

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
