import { Heading, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { useStore } from 'state';

export const History = () => {
  const prevStates = useStore((state) => state.getState?.().prevStates ?? []);
  const setStore = useStore((state) => state.getState?.().setStore);

  return (
    <VStack w="100%" align="start" p="1">
      <Heading as="h2" fontSize="md">
        History
      </Heading>
      <UnorderedList>
        {prevStates.map((s, index) => (
          <ListItem key={index} onClick={() => setStore?.(s)}>
            Point {index}
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};
