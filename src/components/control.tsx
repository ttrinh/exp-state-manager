import { memo } from 'react';
import {
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  UseCounterProps,
} from '@chakra-ui/react';

import { useActions, useStore, shallow } from 'state/use-store';
import { Style } from 'state/types';

interface ControlProps {
  label: string;
  styleKey: keyof Style;
}

const ControlCom = ({ styleKey, label }: ControlProps) => {
  const actions = useActions();

  const [id, value] = useStore((state) => {
    const id = state.ui.selectedSymbols[0] ?? 'stage';
    return [id, state.symbols[id]?.styles['base']?.[styleKey]];
  }, shallow);

  const handleChange: UseCounterProps['onChange'] = (valueString) => {
    actions.symbols.updateStyles([
      {
        symbolId: id,
        layoutId: 'base',
        style: {
          [styleKey]: `${valueString}px`,
        },
      },
    ]);
  };

  if (typeof value !== 'string' && typeof value !== 'number') {
    return null;
  }

  const key = String(styleKey);
  const val = parseInt(`${value}`);

  return (
    <FormControl size="sm">
      <HStack>
        <FormLabel flex="0 0 50px" m="0" fontSize="sm" htmlFor={key}>
          {label}
        </FormLabel>
        <NumberInput size="sm" value={val} onChange={handleChange}>
          <NumberInputField id={key} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </FormControl>
  );
};

export const Control = memo(ControlCom);
