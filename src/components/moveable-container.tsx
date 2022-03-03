import { FC, useRef } from 'react';
import shallow from 'zustand/shallow';

import { actions, useStore } from 'state';
import Moveable, {
  OnDrag,
  OnDragEnd,
  OnDragStart,
  OnResize,
  OnResizeEnd,
  OnResizeStart,
} from 'react-moveable';

interface MoveableContainnerProps {
  id: string;
}

export const MoveableContainner: FC<MoveableContainnerProps> = ({
  id,
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const positionStyles = useStore((state) => {
    const style = state.symbols[id]?.styles['base'];

    return {
      top: style?.top,
      left: style?.left,
      width: style?.width,
      height: style?.height,
    };
  }, shallow);

  const handleDragStart = ({ target, clientX, clientY }: OnDragStart) => {
    // console.log('onDragStart', target);
  };

  const handleDragEnd = ({ target, isDrag, clientX, clientY }: OnDragEnd) => {
    // console.log('onDragEnd', target, isDrag);
  };

  const handleDrag = ({ left, top }: OnDrag) => {
    actions.symbols.updateStyles([
      {
        symbolId: id,
        layoutId: 'base',
        style: {
          top: top + 'px',
          left: left + 'px',
        },
      },
    ]);
  };

  // https://daybrush.com/moveable/storybook/?path=/story/basic--resizable
  const handleResize = ({ width, height, delta }: OnResize) => {
    const w = delta[0] ? `${width}px` : undefined;
    const h = delta[1] ? `${height}px` : undefined;

    if (w || h) {
      actions.symbols.updateStyles([
        {
          symbolId: id,
          layoutId: 'base',
          style: {
            width: w,
            height: h,
          },
        },
      ]);
    }
  };

  const handleResizeStart = ({
    clientX,
    clientY,
    setOrigin,
  }: OnResizeStart) => {
    // console.log('onResizeStart', target);
    // setOrigin(['%', '%']);
    // dragStart?.set()
  };

  const handleResizeEnd = ({ isDrag, clientX, clientY }: OnResizeEnd) => {
    // console.log('onResizeEnd', target, isDrag);
  };

  return (
    <>
      <div
        id={id}
        ref={elementRef}
        style={{
          position: 'absolute',
          ...positionStyles,
        }}
      >
        {children}
      </div>
      <Moveable
        ref={moveableRef}
        target={elementRef}
        origin={true}
        draggable={true}
        resizable={true}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onResize={handleResize}
        onResizeStart={handleResizeStart}
        onResizeEnd={handleResizeEnd}
      ></Moveable>
    </>
  );
};
