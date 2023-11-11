import { getLayoutIds, getUIValue } from 'state/selectors';
import { memo } from 'react';
import { StyleLibListItem } from './style-lib-list-item';
import { useStore, shallow } from 'state/use-store';
import { Heading, VStack } from '@chakra-ui/react';

const StyleLibListCom = () => {
  const activeElementIds = useStore(getUIValue('selectedElements'));
  const layoutIds = useStore(getLayoutIds, shallow);

  if (layoutIds.length < 2 || activeElementIds.length === 0) {
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
          elementId={activeElementIds[0]}
        />
      ))}
    </VStack>
  );
};

export const StyleLibList = memo(StyleLibListCom);
