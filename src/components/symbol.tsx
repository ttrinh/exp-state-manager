import { MoveableContainer } from './moveable-container';
import { useStore, shallow } from 'state/use-store';
import {
  getSymbolChildren,
  getSymbolPosition,
  getSymbolPositionByLayout,
  getSymbolStylesByLayout,
  getUIValue,
} from 'state/selectors';
import { memo } from 'react';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const activeLayout = useStore(getUIValue('activeLayout'));
  const children = useStore(getSymbolChildren(id), shallow);
  const style = useStore(getSymbolStylesByLayout(id, activeLayout), shallow);
  const position = useStore(getSymbolPosition(id), shallow);

  return (
    <MoveableContainer id={id} {...position}>
      <div
        style={{
          ...style,
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
        }}
      >
        {children?.map((childId) => (
          <Symbol key={childId} id={childId} />
        ))}
      </div>
    </MoveableContainer>
  );
});

interface SymbolWithoutPositionProps {
  layoutId: string;
  symbolId: string;
}

/** Symbol rendered without position based on layout, its nested children should also positioned correctly */
export const SymbolWithoutPosition = ({
  symbolId,
  layoutId,
}: SymbolWithoutPositionProps) => {
  const children = useStore(getSymbolChildren(symbolId), shallow);
  const style = useStore(getSymbolStylesByLayout(symbolId, layoutId), shallow);
  const { width, height } = useStore(
    getSymbolPositionByLayout(symbolId, layoutId),
    shallow
  );

  return (
    <div style={{ ...style, width, height }}>
      {children &&
        children.map((childId) => <Symbol key={childId} id={childId} />)}
    </div>
  );
};
