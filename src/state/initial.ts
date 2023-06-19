import type { Without, WithoutId } from 'lib/type-utils';
import type { Style, Symbol, UI, State, Layout } from './types';

const style: WithoutId<Style> = {
  top: '0px',
  left: '0px',
  width: '100px',
  height: '100px',
};

const symbol: WithoutId<Symbol> = {
  type: 'TEXT',
  styles: {
    base: {
      id: 'base',
      ...style,
    },
  },
};

const layout: Without<Layout, 'id' | 'name' | 'baseLayoutId'> = {
  width: 0,
  height: 0,
  style: style,
};

const ui: UI = {
  activeStage: 'stage',
  selectedSymbols: [],
};

const state: State = {
  symbols: {},
  layouts: {
    defaultLayout: '',
    layouts: {},
  },
  ui,
};

export const initial = {
  style,
  symbol,
  ui,
  state,
  layout,
};
