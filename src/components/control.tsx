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

import { campaignActions, useCampaignStore, shallow } from 'state/use-store';
import { Style } from 'state/types';
import { getSymbolStyles, getUIValue } from 'state/selectors';

interface ControlProps {
  label: string;
  styleKey: keyof Style;
}

const ControlCom = ({ styleKey, label }: ControlProps) => {
  const activeLayout = useCampaignStore(getUIValue('activeLayout'));
  const selectedSymbols = useCampaignStore(getUIValue('selectedSymbols'));
  const symbolId = selectedSymbols?.[0] ?? 'stage';

  const value = useCampaignStore((state) => {
    const styles = getSymbolStyles(symbolId)(state);
    return styles?.[styleKey];
  }, shallow);

  const handleChange: UseCounterProps['onChange'] = (valueString) => {
    campaignActions.symbols.updateStyles([
      {
        symbolId,
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
        <FormLabel flex="0 0 50px" m="0" fontSize="xs" htmlFor={key}>
          {label}
        </FormLabel>
        <NumberInput size="xs" value={val} onChange={handleChange}>
          <NumberInputField id={key} />
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
