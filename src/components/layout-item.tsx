import { actions, useStore } from 'state/use-store';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { getLayoutIds, getLayoutValue, getUIValue } from 'state/selectors';
import { memo } from 'react';
import { State } from 'state/types';
import { TrashSimple } from '@phosphor-icons/react';

interface LayoutItemProps {
  layoutId: string;
}

export const LayoutItem = memo(({ layoutId }: LayoutItemProps) => {
  const activeLayout = useStore(getUIValue('activeLayout'));
  const name = useStore(getLayoutValue(layoutId, 'name'));
  const canDelete = useStore(checkCanDelete);

  const isActive = activeLayout === layoutId;

  return (
    <ButtonGroup size="sm" isAttached>
      <Button
        color={isActive ? 'red.500' : 'inherit'}
        onClick={setActive(layoutId)}
        aria-label={name}
      >
        {name}
      </Button>
      {canDelete && (
        <IconButton
          icon={<TrashSimple />}
          aria-label="delete layout"
          onClick={deleteLayout(layoutId)}
        />
      )}
    </ButtonGroup>
  );
});

const checkCanDelete = (state: State) => getLayoutIds(state).length !== 1;

const deleteLayout = (layoutId: string) => () =>
  actions.layouts.delete([layoutId]);

const setActive = (layoutId: string) => () => {
  actions.ui.update({ activeLayout: layoutId });
};
