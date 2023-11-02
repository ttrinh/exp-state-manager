import type {
  Style,
  Symbol,
  UI,
  State,
  Layout,
  SessionUI,
  SessionState,
} from './types';

const style: Style = {
  top: '0px',
  left: '0px',
  width: '100px',
  height: '100px',
};

const symbol: Symbol = {
  id: 'text1',
  type: 'text',
  styles: {},
};

const layout: Layout = {
  id: '',
  deliverable: 'a',
  w: '800px',
  h: '800px',
};

const ui: UI = {
  activeStage: 'stage',
  selectedSymbols: [],
  activeLayout: '',
};

const state: State = {
  symbols: {},
  layouts: {},
  ui,
};

const sessionState: SessionState = {
  ui: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
};

export const initial = {
  style,
  symbol,
  ui,
  state,
  sessionState,
  layout,
};
