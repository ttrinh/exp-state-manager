import { FC, useRef } from 'react';

import Moveable, {
  OnDrag,
  OnDragEnd,
  OnDragStart,
  OnResize,
  OnResizeEnd,
  OnResizeStart,
} from 'react-moveable';
import { State } from 'state/types';
import { campaignActions, shallow, useCampaignStore } from 'state/use-store';

const getSelectedSymbols = (state: State) => state.ui.selectedSymbols;

interface MoveableContainerProps {
  id: string;
}

export const MoveableContainer: FC<MoveableContainerProps> = ({
  id,
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const selectedSymbols = useCampaignStore(getSelectedSymbols);
  const positionStyles = useCampaignStore((state) => {
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
    campaignActions.symbols.updateStyles([
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
      campaignActions.symbols.updateStyles([
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

  const handleClick = () => {
    if (id === 'stage') {
      return;
    }

    campaignActions.ui.update({
      selectedSymbols: [id],
    });
  };

  const isActive = selectedSymbols.includes(id);

  return (
    <>
      <div
        id={id}
        ref={elementRef}
        style={{
          position: 'absolute',
          ...positionStyles,
        }}
        onClick={handleClick}
      >
        {children}
      </div>
      {isActive && (
        <Moveable
          ref={moveableRef}
          target={elementRef}
          origin={true}
          draggable={isActive}
          resizable={isActive}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeEnd={handleResizeEnd}
        ></Moveable>
      )}
    </>
  );
};
