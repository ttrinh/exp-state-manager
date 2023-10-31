import { HStack } from '@chakra-ui/react';
import { LayoutItem } from './layout-item';
import { shallow, useStore } from 'state/use-store';
import { ButtonLayoutCreate } from './button-layout-create';

export const LayoutList = () => {
  const allLayoutIds = useStore((state) => Object.keys(state.layouts), shallow);

  return (
    <HStack p="2">
      {allLayoutIds.map((layoutId) => (
        <LayoutItem key={layoutId} layoutId={layoutId} />
      ))}
      <ButtonLayoutCreate />
    </HStack>
  );
};
