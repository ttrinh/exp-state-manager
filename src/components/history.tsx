import { Button, Heading, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { State } from 'state/types';
import { useTemporalStore } from 'state/use-store';

export const History = () => {
  const { pastStates } = useTemporalStore((state) => state);

  return (
    <VStack w="100%" align="stretch">
      <Heading as="h2" fontSize="md">
        History
      </Heading>
      <VStack spacing="1px" maxH="300px" overflowY="auto">
        {pastStates.map((state, index, ar) => (
          <HistoryItem
            key={index}
            state={state}
            stepNumber={index + 1}
            total={ar.length}
          />
        ))}
      </VStack>
    </VStack>
  );
};

interface HistoryItemProps {
  state: Partial<State>;
  stepNumber: number;
  total: number;
}

const HistoryItem = memo(({ state, stepNumber, total }: HistoryItemProps) => {
  const { undo } = useTemporalStore((state) => state);

  return (
    <Button
      textAlign="left"
      display="flex"
      justifyContent="flex-start"
      w="100%"
      flex="0 0 25px"
      onClick={() => undo(total - stepNumber)}
    >
      State
    </Button>
  );
});
