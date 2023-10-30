import { Button, HStack, VStack } from '@chakra-ui/react';
import { ButtonsSymbolCreate } from 'components/buttons-symbol-create';
import { Control } from 'components/control';
// import { History } from 'components/history';
import { LayoutList } from 'components/layout-list';
import { Pasteboard } from 'components/paste-board';
import { ThemeSwitch } from 'components/theme-switch';
import { useTemporalStore } from 'state/use-store';
import { ArrowUUpLeft, ArrowUUpRight } from '@phosphor-icons/react';

function Campaign() {
  const { undo, redo } = useTemporalStore((state) => state);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'stretch',
      }}
    >
      <div
        style={{
          flex: '1',
          flexDirection: 'column',
          display: 'flex',
          height: '100%',
        }}
      >
        <HStack justify="space-between">
          <ButtonsSymbolCreate />
        </HStack>
        <HStack>
          <LayoutList />
        </HStack>
        <Pasteboard />
      </div>
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

        {/* <History /> */}
      </VStack>
    </div>
  );
}

export default Campaign;
