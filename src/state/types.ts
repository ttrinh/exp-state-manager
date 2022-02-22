export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'RECT';

export interface Symbol {
  id: string;
  type: SymbolTypes;
  children?: string[];
}

export interface Style extends Partial<CSSStyleDeclaration> {
  id: string;
}

export interface UI {
  activeStage: string;
  selectedSymbols: string[];
}
