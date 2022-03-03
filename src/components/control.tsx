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

import { actions, useStore } from 'state';
import { Style } from 'state/types';

interface ControlProps {
  label: string;
  styleKey: keyof Style;
}

const ControlCom = ({ styleKey, label }: ControlProps) => {
  const id = 'stage';
  const value = useStore(
    (state) => state.symbols[id]?.styles['base']?.[styleKey]
  );

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
