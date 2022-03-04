import { VStack } from '@chakra-ui/react';

import { ButtonsSymbolCreate } from 'components/buttons-symbol-create';
import { Control } from 'components/control';
import { ControlText } from 'components/control-text';
import { Pasteboard } from 'components/paste-board';

function Campaign() {
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
        <ButtonsSymbolCreate />
        <Pasteboard />
      </div>
      <VStack p="6">
        <Control label="X" styleKey="left" />
        <Control label="Y" styleKey="top" />
        <Control label="W" styleKey="width" />
        <Control label="H" styleKey="height" />
        <ControlText label="Class" symbolKey="className" />
      </VStack>
    </div>
  );
}

export default Campaign;
