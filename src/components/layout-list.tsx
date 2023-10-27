import { ButtonGroup } from '@chakra-ui/react';
import { LayoutItem } from './layout-item';
import { shallow, useCampaignStore } from 'state/use-store';

export const LayoutList = () => {
  const allLayoutIds = useCampaignStore(
    (state) => Object.keys(state.layouts),
    shallow
  );

  return (
    <ButtonGroup variant="outlined">
      {allLayoutIds.map((layoutId) => (
        <LayoutItem key={layoutId} layoutId={layoutId} />
      ))}
    </ButtonGroup>
  );
};
