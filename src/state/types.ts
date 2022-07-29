export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'RECT';

export interface Style extends Partial<CSSStyleDeclaration> {
  id: string;
}

export interface Symbol {
  id: string;
  type: SymbolTypes;
  className?: string;
  defaultLayout?: string;
  children?: string[];
  styles: Record<string, Style>;
}

export interface UI {
  activeStage: string;
  selectedSymbols: string[];
}

export type State = {
  styles: Record<string, Style>;
  symbols: Record<string, Symbol>;
  ui: UI;
};
