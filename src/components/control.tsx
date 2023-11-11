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
import { actions, useStore, shallow } from 'state/use-store';
import { Style } from 'state/types';
import { getElementAllStylesByLayout, getUIValue } from 'state/selectors';

interface ControlProps {
  label: string;
  styleKey: keyof Style;
}

const ControlCom = ({ styleKey, label }: ControlProps) => {
  const activeLayout = useStore(getUIValue('activeLayout'));
  const selectedElements = useStore(getUIValue('selectedElements'));
  const elementId = selectedElements?.[0] ?? 'stage';

  const value = useStore((state) => {
    const styles = getElementAllStylesByLayout(elementId, activeLayout)(state);
    return styles?.[styleKey];
  }, shallow);

  const handleChange: UseCounterProps['onChange'] = (valueString) => {
    actions.elements.updateStyles([
      {
        elementId,
        layoutId: activeLayout,
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
    <FormControl>
      <HStack>
        <FormLabel
          flex="0 0 12px"
          m="0"
          fontSize="xs"
          fontWeight="bold"
          opacity="0.6"
          htmlFor={key}
        >
          {label}
        </FormLabel>
        <NumberInput size="xs" value={val} onChange={handleChange}>
          <NumberInputField rounded="md" id={key} />
          <NumberInputStepper>
            <NumberIncrementStepper border="none" />
            <NumberDecrementStepper border="none" />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </FormControl>
  );
};

export const Control = memo(ControlCom);
