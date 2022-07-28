import { FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import { ChangeEventHandler, memo } from 'react';

import { Symbol } from 'state/types';
import { campaignActions, useCampaignStore } from 'state/use-store';

interface ControlTextProps {
  label: string;
  symbolKey: keyof Symbol;
}

const ControlTextCom = ({ symbolKey, label }: ControlTextProps) => {
  const id = 'stage';
  const value = useCampaignStore((state) => state.symbols[id]?.[symbolKey]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    campaignActions.symbols.update([
      {
        symbolId: id,
        partialSymbol: {
          [symbolKey]: e.target.value,
        },
      },
    ]);
  };

  return (
    <FormControl size="sm">
      <HStack>
        <FormLabel flex="0 0 50px" m="0" fontSize="sm" htmlFor={symbolKey}>
          {label}
        </FormLabel>
        <Input
          id={symbolKey}
          size="sm"
          value={`${value ?? ''}`}
          onChange={handleChange}
        />
      </HStack>
    </FormControl>
  );
};

export const ControlText = memo(ControlTextCom);
