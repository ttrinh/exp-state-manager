import { getLayoutIds, getUIValue } from 'state/selectors';
import { memo } from 'react';
import { StyleLibListItem } from './style-lib-list-item';
import { useCampaignStore, shallow } from 'state/use-store';
import { Heading, VStack } from '@chakra-ui/react';

const StyleLibListCom = () => {
  const activeSymbolIds = useCampaignStore(getUIValue('selectedSymbols'));
  const layoutIds = useCampaignStore(getLayoutIds, shallow);

  if (layoutIds.length < 2 || activeSymbolIds.length > 0) {
    return null;
  }

  return (
    <VStack align="stretch">
      <Heading as="h3" fontSize="xs">
        Apply styles from other layouts
      </Heading>
      {layoutIds.map((layoutId) => (
        <StyleLibListItem
          key={layoutId}
          layoutId={layoutId}
          symbolId={activeSymbolIds[0]}
        />
      ))}
    </VStack>
  );
};

export const StyleLibList = memo(StyleLibListCom);
