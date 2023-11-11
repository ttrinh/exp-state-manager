import { FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import { ChangeEventHandler, memo } from 'react';

import { Element } from 'state/types';
import { actions, useStore } from 'state/use-store';

interface ControlTextProps {
  label: string;
  elementKey: keyof Element;
}

const ControlTextCom = ({ elementKey, label }: ControlTextProps) => {
  const id = 'stage';
  const value = useStore((state) => state.elements[id]?.[elementKey]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    actions.elements.update([
      {
        elementId: id,
        partialElement: {
          [elementKey]: e.target.value,
        },
      },
    ]);
  };

  return (
    <FormControl size="sm">
      <HStack>
        <FormLabel flex="0 0 50px" m="0" fontSize="sm" htmlFor={elementKey}>
          {label}
        </FormLabel>
        <Input
          id={elementKey}
          size="sm"
          value={`${value ?? ''}`}
          onChange={handleChange}
        />
      </HStack>
    </FormControl>
  );
};

export const ControlText = memo(ControlTextCom);
