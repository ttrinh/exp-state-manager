import { CSSProperties } from 'react';

export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'BOX';

export interface Style extends CSSProperties {
  id: string;
}

export interface Symbol {
  id: string;

  // Symbol type affects its acceptable attributes
  type: SymbolTypes;

  // children ids
  children?: string[];

  // basic box styles
  styles: Record<string, Style>;

  layouts?: Record<string, LayoutData>;
}

// store styles/attributes/data for a particular layout
export interface LayoutData<T extends object = {}> {
  // connected layout id
  connectLayoutId: string;

  // styles of the symbol for this layout
  style: CSSProperties;

  // data for the symbol for this particular layout to be processed
  data?: T;

  // trackings
  clickUrl?: string;
  impressions?: string[];
}

// Store layout information
export interface Layout<T extends object = {}> {
  id: string;

  // Base layout that this bases upon. `undefined` is the base itself
  baseLayoutId?: string;

  // user-friendly name of the layout
  name: string;

  // dimension. can be string or number
  width: number | string;
  height: number | string;

  // styles of the symbol for this layout
  style: CSSProperties;

  // data for the symbol for this particular layout to be processed
  data?: T;

  // trackings
  clickUrl?: string;
  impressions?: string[];
}

export interface Layouts {
  // default/base layout which all other layouts depends on
  // Note: Changing this should recalculate all other layouts'
  // properties that differs from the new default layout
  defaultLayout: string;

  layouts: Record<string, Layout>;
}

export interface UI {
  // indicate which layout's size is active
  activeStage: string;

  // mark selected symbols on stage
  selectedSymbols: string[];
}

export type State = {
  symbols: Record<string, Symbol>;
  layouts: Layouts;
  ui: UI;
};
