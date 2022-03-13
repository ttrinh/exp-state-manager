import { memo, useRef } from 'react';
import { useSelecto } from './use-selecto';

const StageCom = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useSelecto(stageRef);

  return <div ref={stageRef}>test</div>;
};

export const Stage = memo(StageCom);
