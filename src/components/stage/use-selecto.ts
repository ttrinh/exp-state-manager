import { RefObject } from 'react';
import { SelectoProps } from 'react-selecto';
import { actions } from 'state/use-store';

export const useSelecto = (stageRef: RefObject<HTMLDivElement>) => {
  const selectableTargets = ['.selectable'];

  const onSelect: SelectoProps['onSelect'] = (e) => {
    const addedSymbols = e.added.map((el) => el.id);
    const removedSymbols = e.removed.map((el) => el.id);
    console.log(addedSymbols, removedSymbols);

    actions.ui.update({
      selectedSymbols: addedSymbols,
    });
  };

  return {
    stageRef,
    selectableTargets,
    onSelect,
  };
};
