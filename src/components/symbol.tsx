import { memo } from 'react';

import { useCampaignStore, shallow } from 'state/use-store';
import { MoveableContainer } from './moveable-container';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const { children, layoutStyles, type } = useCampaignStore((state) => {
    const sym = state.symbols[id];
    const layoutStyles = sym?.styles['base'];

    return {
      children: sym?.children,
      layoutStyles,
      type: sym?.type,
    };
  }, shallow);

  return (
    <MoveableContainer id={id}>
      <div
        style={{
          ...layoutStyles,
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
        }}
      >
        {children &&
          children.map((childId) => <Symbol key={childId} id={childId} />)}
      </div>
    </MoveableContainer>
  );
});
