import { omit } from 'remeda';
import { isGroupType, isStage } from './type-check';
import {
  Layout,
  SessionState,
  SessionUI,
  Stage,
  State,
  Style,
  Element,
  UI,
} from './types';

export const POSITION_KEYS: (keyof Style)[] = [
  'top',
  'left',
  'width',
  'height',
  'rotate',
];

/**
 * Elements
 **/
export const getElement =
  (elementId: string) =>
  (state: State): Element | Stage | undefined =>
    state.elements[elementId];

export const getElementChildren =
  (elementId: string) =>
  (state: State): string[] | undefined => {
    const element = getElement(elementId)(state);
    return isGroupType(element) ? element.children : [];
  };

/** Get all element's styles (including positions) by layout */
export const getElementAllStylesByLayout =
  (elementId: string, layoutId: string) =>
  (state: State): Style | undefined => {
    const element = getElement(elementId)(state);
    return element?.styles?.[layoutId];
  };

/** Get element's styles (without position) by layout */
export const getElementStylesByLayout =
  (elementId: string, layoutId: string) =>
  (state: State): Style | undefined => {
    const style = getElementAllStylesByLayout(elementId, layoutId)(state);
    return style ? omit(style, POSITION_KEYS) : undefined;
  };

// export const getElementStyleValue =
//   <T extends keyof Style>(elementId: string, key: T) =>
//   (state: State): Style[T] =>
//     getElementStyles(elementId)(state)?.[key];

/** Get element's position by layout */
export const getElementPositionByLayout =
  (elementId: string, layoutId: string) => (state: State) => {
    const element = getElement(elementId)(state);
    const layout = getLayout(layoutId)(state);
    const styles = getElementAllStylesByLayout(elementId, layoutId)(state);

    // width and height of Stage depends on the current layout
    const isLayoutPosition = isStage(element) && layout;
    const width = isLayoutPosition ? layout.w : `${styles?.width ?? '100px'}`;
    const height = isLayoutPosition ? layout.h : `${styles?.height ?? '100px'}`;
    const rotate = isLayoutPosition ? '0deg' : `${styles?.rotate}`;

    return {
      top: `${styles?.top ?? '0px'}`,
      left: `${styles?.left ?? '0px'}`,
      width,
      height,
      rotate,
    };
  };

/** Get element's styles (without position) of the current layout */
export const getElementStyles =
  (elementId: string) =>
  (state: State): Style | undefined => {
    const activeLayout = getUIValue('activeLayout')(state);
    return getElementStylesByLayout(elementId, activeLayout)(state);
  };

/** Get element's position of the current layout */
export const getElementPosition = (elementId: string) => (state: State) => {
  const activeLayout = getUIValue('activeLayout')(state);
  return getElementPositionByLayout(elementId, activeLayout)(state);
};

/**
 * Layouts
 **/
export const getActiveLayout = (state: State): Layout | undefined => {
  const activeLayout = getUIValue('activeLayout')(state);
  return getLayout(activeLayout)(state);
};

export const getLayout =
  (layoutId: string) =>
  (state: State): Layout | undefined =>
    state.layouts[layoutId];

export const getLayoutIds = (state: State): string[] =>
  Object.keys(state.layouts);

export const getLayoutValue =
  <T extends keyof Layout>(layoutId: string, key: T) =>
  (state: State): Layout[T] | undefined =>
    getLayout(layoutId)(state)?.[key];

/**
 * UI
 **/
export const getUIValue =
  <T extends keyof UI>(key: T) =>
  (state: State): UI[T] =>
    state.ui[key];

export const checkElementActive = (elementId: string) => (state: State) => {
  const selectedElements = getUIValue('selectedElements')(state);
  return selectedElements.includes(elementId);
};

/**
 * Temporary Session
 */
export const getSessionUI =
  <T extends keyof SessionUI>(key: T) =>
  (sessionState: SessionState): SessionUI[T] =>
    sessionState.ui[key];
