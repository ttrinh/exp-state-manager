import { isGroupType, isStage } from './type-check';
import { Layout, Stage, State, Style, Symbol, UI } from './types';

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

/** Get symbol's styles of the current layout */
export const getSymbolStyles =
  (symbolId: string) =>
  (state: State): Style | undefined => {
    const activeLayout = getUIValue('activeLayout')(state);
    const symbol = getSymbol(symbolId)(state);
    return symbol?.styles?.[activeLayout];
  };

// export const getSymbolStyleValue =
//   <T extends keyof Style>(symbolId: string, key: T) =>
//   (state: State): Style[T] =>
//     getSymbolStyles(symbolId)(state)?.[key];

/** Get symbol's position of the current layout */
export const getSymbolPosition = (symbolId: string) => (state: State) => {
  const symbol = getSymbol(symbolId)(state);
  const styles = getSymbolStyles(symbolId)(state);
  const layout = getActiveLayout(state);

  // width and height of Stage depends on the current layout
  const isLayoutPosition = isStage(symbol) && layout;
  const width = isLayoutPosition ? layout.w : `${styles?.width ?? '100px'}`;
  const height = isLayoutPosition ? layout.h : `${styles?.height ?? '100px'}`;

  return {
    top: `${styles?.top ?? '0px'}`,
    left: `${styles?.left ?? '0px'}`,
    width,
    height,
  };
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
