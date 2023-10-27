import { Button, HStack, VStack } from '@chakra-ui/react';
import { ButtonsSymbolCreate } from 'components/buttons-symbol-create';
import { Control } from 'components/control';
import { History } from 'components/history';
import { LayoutList } from 'components/layout-list';
import { Pasteboard } from 'components/paste-board';
import { ThemeSwitch } from 'components/theme-switch';
import { useTemporalStore } from 'state/use-store';

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
          <ThemeSwitch />
        </HStack>
        <HStack>
          <LayoutList />
        </HStack>
        <Pasteboard />
      </div>
      <VStack p="6">
        <HStack>
          <Button onClick={() => undo()}>Undo</Button>
          <Button onClick={() => redo()}>Redo</Button>
        </HStack>

        <Control label="X" styleKey="left" />
        <Control label="Y" styleKey="top" />
        <Control label="W" styleKey="width" />
        <Control label="H" styleKey="height" />

        <History />
      </VStack>
    </div>
  );
}

export default Campaign;
