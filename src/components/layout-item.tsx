import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { actions, useStore } from 'state/use-store';
import { getLayoutValue, getUIValue } from 'state/selectors';
import { memo } from 'react';
import { TrashSimple } from '@phosphor-icons/react';

interface LayoutItemProps {
  layoutId: string;
}

export const LayoutItem = memo(({ layoutId }: LayoutItemProps) => {
  const activeLayout = useStore(getUIValue('activeLayout'));
  const name = useStore(getLayoutValue(layoutId, 'name'));

  const setActiveLayout = () => {
    actions.ui.update({ activeLayout: layoutId });
  };

  const deleteLayout = () => {
    actions.layouts.delete([layoutId]);
  };

  const isActive = activeLayout === layoutId;

  return (
    <ButtonGroup size="sm" isAttached>
      <Button
        color={isActive ? 'red.500' : 'inherit'}
        onClick={setActiveLayout}
        aria-label={name}
      >
        {name}
      </Button>
      <IconButton
        icon={<TrashSimple />}
        aria-label="delete layout"
        onClick={deleteLayout}
      />
    </ButtonGroup>
  );
});
