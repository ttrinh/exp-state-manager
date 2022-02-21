import produce from 'immer';

import { Produce, StoreSlice } from './use-store';
import { WithoutId } from 'lib/type-utils';

export interface Styles extends Partial<CSSStyleDeclaration> {
  id: string;
}

export interface StylesStore {
  styles: Record<string, Styles>;
  // editStyles: (id: string, partialStyles: WithoutId<Styles>) => void;
  // setStyles: (id: string, partialStyles: WithoutId<Styles>) => void;
  // deleteStyles: (id: string) => void;
  // resetStyles: () => void;
}

export const defaultStyles: WithoutId<Styles> = {
  top: '0px',
  left: '0px',
  width: '200px',
  height: '100px',
};

export const createStylesSlice: StoreSlice<StylesStore> = (set) => ({
  styles: {},

  // /** Edit existing styles */
  // editStyles: (id, partialStyles) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.styles[id] = {
  //         ...prev.styles[id],
  //         ...partialStyles,
  //       };
  //     })
  //   ),

  // /** Set styles */
  // setStyles: (id, partialStyles) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.styles[id] = { id, ...partialStyles };
  //     })
  //   ),

  // /** Completely remove styles */
  // deleteStyles: (id) =>
  //   set(
  //     produce<Produce>((prev) => {
  //       delete prev.styles[id];
  //     })
  //   ),

  // /** Completely reset all styles */
  // resetStyles: () =>
  //   set(
  //     produce<Produce>((prev) => {
  //       prev.styles = {};
  //     })
  //   ),
});
