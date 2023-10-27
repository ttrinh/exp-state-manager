import { CSSProperties, ReactNode, useRef } from 'react';
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
const getActiveLayout = (state: State) => state.ui.activeLayout;

interface MoveableContainerProps {
  id: string;
  children: ReactNode;
  top: CSSProperties['top'];
  left: CSSProperties['left'];
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export const MoveableContainer = ({
  id,
  children,
  ...positionStyles
}: MoveableContainerProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const selectedSymbols = useCampaignStore(getSelectedSymbols);
  const activeLayout = useCampaignStore(getActiveLayout);

  const handleDragStart = ({ target, clientX, clientY }: OnDragStart) => {
    // console.log('onDragStart', target);
  };

  const handleDragEnd = ({ target, isDrag, clientX, clientY }: OnDragEnd) => {
    // console.log('onDragEnd', target, isDrag);
  };

  const handleDrag = ({ left, top, target }: OnDrag) => {
    const l = `${left}px`;
    const t = `${top}px`;

    // React 18 optimize rendering, so we need to adjust dom to sync the fast motion
    target!.style.left = l;
    target!.style.top = t;

    campaignActions.symbols.updateStyles([
      {
        symbolId: id,
        layoutId: activeLayout,
        style: {
          top: t,
          left: l,
        },
      },
    ]);
  };

  // https://daybrush.com/moveable/storybook/?path=/story/basic--resizable
  const handleResize = ({ target, width, height, delta }: OnResize) => {
    const w = delta[0] ? `${width}px` : undefined;
    const h = delta[1] ? `${height}px` : undefined;

    if (w || h) {
      // React 18 optimize rendering, so we need to adjust dom to sync the fast motion
      w && (target!.style.width = w);
      h && (target!.style.height = h);

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
          // flushSync={flushSync} // NOTE: use flushSync will not improve performance in fast motion
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
