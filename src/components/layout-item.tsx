import { Button } from '@chakra-ui/react';
import { memo } from 'react';
import { getLayoutValue, getUIValue } from 'state/selectors';
import { campaignActions, useCampaignStore } from 'state/use-store';

interface LayoutItemProps {
  layoutId: string;
}

export const LayoutItem = memo(({ layoutId }: LayoutItemProps) => {
  const activeLayout = useCampaignStore(getUIValue('activeLayout'));
  const name = useCampaignStore(getLayoutValue(layoutId, 'name'));

  const isActive = activeLayout === layoutId;

  const setActiveLayout = (layoutId: string) => {
    campaignActions.ui.update({ activeLayout: layoutId, selectedSymbols: [] });
  };

  return (
    <Button
      color={isActive ? 'red.500' : 'inherit'}
      onClick={() => setActiveLayout(layoutId)}
      aria-label={name}
    >
      {name}
    </Button>
  );
});
