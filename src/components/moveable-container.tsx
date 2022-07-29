import { ReactNode, useRef } from 'react';
import { flushSync } from 'react-dom';
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
  children: ReactNode;
}

export const MoveableContainer = ({ id, children }: MoveableContainerProps) => {
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
  const handleResize = ({ target, width, height, delta }: OnResize) => {
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
      // w && (target!.style.width = w);
      // h && (target!.style.height = h);
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
          flushSync={flushSync}
          ref={moveableRef}
          target={elementRef}
          origin={true}
          draggable={isActive}
          resizable={isActive}
          throttleResize={0}
          edgeDraggable={true}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeEnd={handleResizeEnd}
        />
      )}
    </>
  );
};
