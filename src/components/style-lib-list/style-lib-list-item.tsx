import { memo } from 'react';
import { actions, useStore } from 'state/use-store';
import { getLayoutValue, getUIValue } from 'state/selectors';
import { Box, Text, VStack } from '@chakra-ui/react';
import { ElementWithoutPosition } from 'components/element';

interface StyleLibListItemProps {
  elementId: string;
  layoutId: string;
}

const StyleLibListItemCom = ({
  elementId,
  layoutId,
}: StyleLibListItemProps) => {
  const activeLayout = useStore(getUIValue('activeLayout'));
  const layoutName = useStore(getLayoutValue(layoutId, 'name'));

  const applyStyle = () => {
    actions.elements.applyStyles([
      {
        elementId,
        sourceLayoutId: layoutId,
        targetLayoutId: activeLayout,
      },
    ]);
  };

  return (
    <VStack
      as="button"
      align="start"
      justify="stretch"
      bg="whiteAlpha.100"
      rounded="md"
      px="2"
      py="1"
      border="1px dashed"
      borderColor="blackAlpha.200"
      _hover={{
        borderColor: 'blackAlpha.400',
        bg: 'whiteAlpha.200',
      }}
      onClick={applyStyle}
    >
      <Text as="span" fontSize="xs" fontWeight="bold">
        {layoutName}
      </Text>
      <Box w="100%" h="50px" overflow="auto">
        <ElementWithoutPosition elementId={elementId} layoutId={layoutId} />
      </Box>
    </VStack>
  );
};
export const StyleLibListItem = memo(StyleLibListItemCom);
