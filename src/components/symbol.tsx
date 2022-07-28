import { memo } from 'react';

import { useCampaignStore, shallow } from 'state/use-store';
import { MoveableContainer } from './moveable-container';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const { children, ...symbolStyles } = useCampaignStore((state) => {
    const sym = state.symbols[id];
    const s = sym?.styles['base'];

    return {
      background: s?.background,
      backgroundRepeat: s?.backgroundRepeat,
      backgroundSize: s?.backgroundSize,
      border: s?.border,
      children: sym?.children,
    };
  }, shallow);

  return (
    <MoveableContainer id={id}>
      <div
        style={{
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          ...symbolStyles,
        }}
      >
        {children &&
          children.map((childId) => <Symbol key={childId} id={childId} />)}
      </div>
    </MoveableContainer>
  );
});
