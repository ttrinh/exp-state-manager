import { actions, sessionActions, useStore } from 'state/use-store';
import {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useMemo,
  useRef,
} from 'react';
import { getUIValue, checkSymbolActive } from 'state/selectors';
import Moveable, { OnDrag, OnResize } from 'react-moveable';

interface MoveableContainerProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
  top: CSSProperties['top'];
  left: CSSProperties['left'];
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export const MoveableContainer = ({
  id,
  children,
  disabled = false,
  ...position
}: MoveableContainerProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const isActive = useStore(checkSymbolActive(id));
  const activeLayout = useStore(getUIValue('activeLayout'));

  const drag = useMemo(() => dragFn(id, activeLayout), [id, activeLayout]);
  const resize = useMemo(() => resizeFn(id, activeLayout), [id, activeLayout]);

  return (
    <>
      <div
        id={id}
        ref={elementRef}
        style={{ position: 'absolute', ...position }}
        onClick={clickFn(id)}
      >
        {children}
      </div>

      {!disabled && isActive && (
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
          onDrag={drag}
          onResize={resize}
        />
      )}
    </>
  );
};

// select on click
const clickFn =
  (symbolId: string): MouseEventHandler<HTMLDivElement> =>
  (e) => {
    e.stopPropagation();
    const selectedSymbols = symbolId === 'stage' ? [] : [symbolId];
    actions.ui.update({ selectedSymbols });
  };

const dragFn =
  (symbolId: string, layoutId: string) =>
  ({ left, top, target }: OnDrag) => {
    const l = `${left}px`;
    const t = `${top}px`;

    // React 18 optimize rendering, so we need to adjust dom to sync the fast motion
    target!.style.left = l;
    target!.style.top = t;

    actions.symbols.updateStyles([
      {
        symbolId,
        layoutId,
        style: {
          top: t,
          left: l,
        },
      },
    ]);

    sessionActions.ui.update({ top, left });
  };

// https://daybrush.com/moveable/storybook/?path=/story/basic--resizable
const resizeFn =
  (symbolId: string, layoutId: string) =>
  ({ target, width, height, delta }: OnResize) => {
    const w = delta[0] ? `${width}px` : undefined;
    const h = delta[1] ? `${height}px` : undefined;

    if (w || h) {
      // React 18 optimize rendering, so we need to adjust dom to sync the fast motion
      w && (target!.style.width = w);
      h && (target!.style.height = h);

      actions.symbols.updateStyles([
        {
          symbolId,
          layoutId,
          style: {
            width: w,
            height: h,
          },
        },
      ]);

      sessionActions.ui.update({ width, height });
    }
  };

// const resizeStart = ({ clientX, clientY, setOrigin }: OnResizeStart) => {
//   console.log('onResizeStart', target); setOrigin(['%', '%']); dragStart?.set()
// };

// const resizeEnd = ({ isDrag, clientX, clientY }: OnResizeEnd) => {
//   console.log('onResizeEnd', target, isDrag);
// };

// const dragStart = ({ target, clientX, clientY }: OnDragStart) => {
//   console.log('onDragStart', target);
// };

// const dragEnd = ({ target, isDrag, clientX, clientY }: OnDragEnd) => {
//   console.log('onDragEnd', target, isDrag);
// };
