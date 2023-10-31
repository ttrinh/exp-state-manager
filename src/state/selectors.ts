import { omit } from 'remeda';
import { isGroupType, isStage } from './type-check';
import { Layout, Stage, State, Style, Symbol, UI } from './types';

export const POSITION_KEYS: (keyof Style)[] = [
  'top',
  'left',
  'width',
  'height',
  'rotate',
];

/**
 * Symbols
 **/
export const getSymbol =
  (symbolId: string) =>
  (state: State): Symbol | Stage | undefined =>
    state.symbols[symbolId];

export const getSymbolChildren =
  (symbolId: string) =>
  (state: State): string[] | undefined => {
    const symbol = getSymbol(symbolId)(state);
    return isGroupType(symbol) ? symbol.children : [];
  };

/** Get all symbol's styles (including positions) by layout */
export const getSymbolAllStylesByLayout =
  (symbolId: string, layoutId: string) =>
  (state: State): Style | undefined => {
    const symbol = getSymbol(symbolId)(state);
    return symbol?.styles?.[layoutId];
  };

/** Get symbol's styles (without position) by layout */
export const getSymbolStylesByLayout =
  (symbolId: string, layoutId: string) =>
  (state: State): Style | undefined => {
    const style = getSymbolAllStylesByLayout(symbolId, layoutId)(state);
    return style ? omit(style, POSITION_KEYS) : undefined;
  };

// export const getSymbolStyleValue =
//   <T extends keyof Style>(symbolId: string, key: T) =>
//   (state: State): Style[T] =>
//     getSymbolStyles(symbolId)(state)?.[key];

/** Get symbol's position by layout */
export const getSymbolPositionByLayout =
  (symbolId: string, layoutId: string) => (state: State) => {
    const symbol = getSymbol(symbolId)(state);
    const layout = getLayout(layoutId)(state);
    const styles = getSymbolAllStylesByLayout(symbolId, layoutId)(state);

    // width and height of Stage depends on the current layout
    const isLayoutPosition = isStage(symbol) && layout;
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

/** Get symbol's styles (without position) of the current layout */
export const getSymbolStyles =
  (symbolId: string) =>
  (state: State): Style | undefined => {
    const activeLayout = getUIValue('activeLayout')(state);
    return getSymbolStylesByLayout(symbolId, activeLayout)(state);
  };

/** Get symbol's position of the current layout */
export const getSymbolPosition = (symbolId: string) => (state: State) => {
  const activeLayout = getUIValue('activeLayout')(state);
  return getSymbolPositionByLayout(symbolId, activeLayout)(state);
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

export const checkSymbolActive = (symbolId: string) => (state: State) => {
  const selectedSymbols = getUIValue('selectedSymbols')(state);
  return selectedSymbols.includes(symbolId);
};
