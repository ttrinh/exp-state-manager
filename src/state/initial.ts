import type { Without } from 'lib/type-utils';
import type { Style, Symbol, UI, State, Layout } from './types';

const style: Style = {
  id: 'base',
  top: '0px',
  left: '0px',
  width: '100px',
  height: '100px',
};

const symbol: Symbol = {
  id: 'text1',
  type: 'text',
  styles: {
    base: style,
  },
};

const layout: Without<Layout, 'id' | 'name'> = {
  w: '0',
  h: '0',
  deliverable: 'a',
};

const ui: UI = {
  activeStage: 'stage',
  selectedSymbols: [],
};

const state: State = {
  symbols: {},
  layouts: {},
  ui,
};

export const initial = {
  style,
  symbol,
  ui,
  state,
  layout,
};
