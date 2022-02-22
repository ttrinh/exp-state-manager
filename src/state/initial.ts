import { WithoutId } from 'lib/type-utils';
import { Style, Symbol, UI } from './types';

const style: WithoutId<Style> = {
  top: '0px',
  left: '0px',
  width: '150px',
  height: '100px',
};

const symbol: WithoutId<Symbol> = {
  type: 'TEXT',
};

const ui: UI = {
  activeStage: 'stage',
  selectedSymbols: [],
};

export const initial = {
  style,
  symbol,
  ui,
};
