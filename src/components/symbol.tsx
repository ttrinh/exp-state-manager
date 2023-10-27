import { isGroupType } from 'state/type-check';
import { memo } from 'react';
import { MoveableContainer } from './moveable-container';
import { useCampaignStore, shallow } from 'state/use-store';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const { children, layoutStyles, ...position } = useCampaignStore((state) => {
    const activeLayout = state.ui.activeLayout;
    const sym = state.symbols[id];
    const layoutStyles = sym?.styles[activeLayout] ?? {};
    const children = sym && isGroupType(sym) ? sym?.children : undefined;
    const { top, left, width, height } = layoutStyles;

    return {
      children,
      layoutStyles,
      top,
      left,
      width,
      height,
    };
  }, shallow);

  return (
    <MoveableContainer id={id} {...position}>
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
