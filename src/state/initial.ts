import { WithoutId } from 'lib/type-utils';
import { Style, Symbol, UI, State } from './types';

const style: WithoutId<Style> = {
  top: '0px',
  left: '0px',
  width: '150px',
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

const ui: UI = {
  activeStage: 'stage',
  selectedSymbols: [],
};

const state: State = {
  styles: {},
  symbols: {},
  ui,
};

export const initial = {
  style,
  symbol,
  ui,
  state,
};
