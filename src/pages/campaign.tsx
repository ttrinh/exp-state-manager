import { ArrowUUpLeft, ArrowUUpRight } from '@phosphor-icons/react';
import { Button, HStack, VStack } from '@chakra-ui/react';
import { ButtonsSymbolCreate } from 'components/buttons-symbol-create';
import { Control } from 'components/control';
import { LayoutList } from 'components/layout-list';
import { Pasteboard } from 'components/paste-board';
import { ThemeSwitch } from 'components/theme-switch';
import { useTemporalStore } from 'state/use-store';
import { StyleLibList } from 'components/style-lib-list';

function Campaign() {
  const { undo, redo } = useTemporalStore((state) => state);

  return (
    <HStack w="100%" h="100%" align="stretch" justify="stretch">
      <VStack bg="whiteAlpha.100">
        <ButtonsSymbolCreate />
      </VStack>
      <VStack flex="1" align="stretch" h="100%" spacing="0">
        <LayoutList />
        <Pasteboard />
      </VStack>
      <VStack align="start" spacing="10" p="6" bg="whiteAlpha.100">
        <HStack justify="start">
          <Button leftIcon={<ArrowUUpLeft />} size="sm" onClick={() => undo()}>
            Undo
          </Button>
          <Button leftIcon={<ArrowUUpRight />} size="sm" onClick={() => redo()}>
            Redo
          </Button>
          <ThemeSwitch />
        </HStack>

        <VStack align="start">
          <Control label="X" styleKey="left" />
          <Control label="Y" styleKey="top" />
          <Control label="W" styleKey="width" />
          <Control label="H" styleKey="height" />
        </VStack>

        <VStack w="100%" align="stretch">
          <StyleLibList />
        </VStack>

        {/* <History /> */}
      </VStack>
    </HStack>
  );
}

export default Campaign;
