// import { Button, Heading, VStack } from '@chakra-ui/react';
// import { memo } from 'react';
// import { VscDebugBreakpointLogUnverified as IconItem } from 'react-icons/vsc';
// import { useStore } from 'state';
// import { State } from 'state/types';

// const getPrevStates = (state: State) => state.getState?.().prevStates ?? [];
// const getSetStore = (state: State) => state.getState?.().setStore;

export const History = () => {
  return null;
  // const prevStates = useStore(getPrevStates);

  // return (
  //   <VStack w="100%" align="stretch">
  //     <Heading as="h2" fontSize="md">
  //       History
  //     </Heading>
  //     <VStack spacing="1px" maxH="300px" overflowY="auto">
  //       {prevStates.map((state, index) => (
  //         <HistoryItem key={index} state={state} />
  //       ))}
  //     </VStack>
  //   </VStack>
  // );
};

// const HistoryItem = memo(({ state }: { state: State }) => {
//   const setStore = useStore(getSetStore);

//   return (
//     <Button
//       textAlign="left"
//       display="flex"
//       justifyContent="flex-start"
//       isFullWidth
//       leftIcon={<IconItem />}
//       onClick={() => setStore?.(state)}
//     >
//       State
//     </Button>
//   );
// });
