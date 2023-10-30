import { memo } from 'react';
import { campaignActions, useCampaignStore } from 'state/use-store';
import { getLayoutValue, getUIValue } from 'state/selectors';
import { Box, Text, VStack } from '@chakra-ui/react';
import { SymbolWithoutPosition } from 'components/symbol';

interface StyleLibListItemProps {
  symbolId: string;
  layoutId: string;
}

const StyleLibListItemCom = ({ symbolId, layoutId }: StyleLibListItemProps) => {
  const activeLayout = useCampaignStore(getUIValue('activeLayout'));
  const layoutName = useCampaignStore(getLayoutValue(layoutId, 'name'));

  const applyStyle = () => {
    campaignActions.symbols.applyStyles([
      {
        symbolId,
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
      p="2"
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
      <Box>
        <SymbolWithoutPosition symbolId={symbolId} layoutId={layoutId} />
      </Box>
    </VStack>
  );
};
export const StyleLibListItem = memo(StyleLibListItemCom);
