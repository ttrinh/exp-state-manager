import { Button, HStack, VStack } from '@chakra-ui/react';

import { ButtonsSymbolCreate } from 'components/buttons-symbol-create';
import { Control } from 'components/control';
import { ControlText } from 'components/control-text';
import { History } from 'components/history';
import { Pasteboard } from 'components/paste-board';
import { ThemeSwitch } from 'components/theme-switch';
// import { useStore } from 'state';

function Campaign() {
  // const [undo, redo] = useStore((state) => [state.undo, state.redo]);

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
        <Pasteboard />
      </div>
      <VStack p="6">
        <HStack>
          <Button onClick={() => {}}>Undo</Button>
          <Button onClick={() => {}}>Redo</Button>
        </HStack>

        <Control label="X" styleKey="left" />
        <Control label="Y" styleKey="top" />
        <Control label="W" styleKey="width" />
        <Control label="H" styleKey="height" />
        <ControlText label="Class" symbolKey="className" />

        <History />
      </VStack>
    </div>
  );
}

export default Campaign;
