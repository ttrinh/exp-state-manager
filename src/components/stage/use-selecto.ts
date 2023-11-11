import { RefObject } from 'react';
import { SelectoProps } from 'react-selecto';
import { actions } from 'state/use-store';

export const useSelecto = (stageRef: RefObject<HTMLDivElement>) => {
  const selectableTargets = ['.selectable'];

  const onSelect: SelectoProps['onSelect'] = (e) => {
    const addedElements = e.added.map((el) => el.id);
    const removedElements = e.removed.map((el) => el.id);
    console.log(addedElements, removedElements);

    actions.ui.update({
      selectedElements: addedElements,
    });
  };

  return {
    stageRef,
    selectableTargets,
    onSelect,
  };
};
