import { Button } from '@chakra-ui/react';
import { campaignActions, shallow, useCampaignStore } from 'state/use-store';

interface LayoutItemProps {
  layoutId: string;
}

export const LayoutItem = ({ layoutId }: LayoutItemProps) => {
  const { isActive, name } = useCampaignStore((state) => {
    const layout = state.layouts[layoutId];
    const name = layout?.name ?? layoutId;

    return {
      isActive: state.ui.activeLayout === layoutId,
      name,
    };
  }, shallow);

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
};
