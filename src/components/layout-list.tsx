import { ButtonGroup } from '@chakra-ui/react';
import { LayoutItem } from './layout-item';
import { useCampaignStore } from 'state/use-store';

export const LayoutList = () => {
  const allLayoutIds = useCampaignStore((state) => Object.keys(state.layouts));

  return (
    <ButtonGroup variant="outlined" aria-label="symbol create bar">
      {allLayoutIds.map((layoutId) => (
        <LayoutItem key={layoutId} layoutId={layoutId} />
      ))}
    </ButtonGroup>
  );
};
