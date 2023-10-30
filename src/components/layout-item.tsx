import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { campaignActions, useCampaignStore } from 'state/use-store';
import { getLayoutValue, getUIValue } from 'state/selectors';
import { memo } from 'react';
import { TrashSimple } from '@phosphor-icons/react';

interface LayoutItemProps {
  layoutId: string;
}

export const LayoutItem = memo(({ layoutId }: LayoutItemProps) => {
  const activeLayout = useCampaignStore(getUIValue('activeLayout'));
  const name = useCampaignStore(getLayoutValue(layoutId, 'name'));

  const setActiveLayout = () => {
    campaignActions.ui.update({ activeLayout: layoutId, selectedSymbols: [] });
  };

  const deleteLayout = () => {
    campaignActions.layouts.delete([layoutId]);
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
