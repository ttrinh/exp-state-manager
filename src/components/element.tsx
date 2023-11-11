import { MoveableContainer } from './moveable-container';
import { useStore, shallow } from 'state/use-store';
import {
  getElementChildren,
  getElementPosition,
  getElementPositionByLayout,
  getElementStylesByLayout,
  getUIValue,
} from 'state/selectors';
import { memo } from 'react';

interface ElementProps {
  id: string;
}

export const Element = memo(({ id }: ElementProps) => {
  const activeLayout = useStore(getUIValue('activeLayout'));
  const children = useStore(getElementChildren(id), shallow);
  const style = useStore(getElementStylesByLayout(id, activeLayout), shallow);
  const position = useStore(getElementPosition(id), shallow);

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
          <Element key={childId} id={childId} />
        ))}
      </div>
    </MoveableContainer>
  );
});

interface ElementWithoutPositionProps {
  layoutId: string;
  elementId: string;
}

/** Element rendered without position based on layout, its nested children should also positioned correctly */
export const ElementWithoutPosition = ({
  elementId,
  layoutId,
}: ElementWithoutPositionProps) => {
  const children = useStore(getElementChildren(elementId), shallow);
  const style = useStore(
    getElementStylesByLayout(elementId, layoutId),
    shallow
  );
  const { width, height } = useStore(
    getElementPositionByLayout(elementId, layoutId),
    shallow
  );

  return (
    <div style={{ ...style, width, height }}>
      {children &&
        children.map((childId) => <Element key={childId} id={childId} />)}
    </div>
  );
};
