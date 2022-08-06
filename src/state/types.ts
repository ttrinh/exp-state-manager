import { CSSProperties } from 'react';

export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'BOX';

export interface Style extends CSSProperties {
  id: string;
}

export interface Attribute {
  id: string;
  [key: string]: unknown;
}

export interface Symbol {
  id: string;

  // Symbol type affects its acecptable attributes
  type: SymbolTypes;

  // className
  className?: string;

  // default/base layout which all other layouts depends on
  defaultLayout?: string;

  // children ids
  children?: string[];

  // basic box styles
  styles: Record<string, Style>;

  // // attributes based on symbol type;
  // attributes?: Record<string, Attribute>;

  // layouts?: Record<string, Layout>;
}

// export interface Layout {
//   id: string;
//   name: string;
//   style: Style;
//   attribute: Attribute;
// }

export interface UI {
  // indicate which layout's size is active
  activeStage: string;

  // mark selected symbols on stage
  selectedSymbols: string[];
}

export type State = {
  symbols: Record<string, Symbol>;
  ui: UI;
};
