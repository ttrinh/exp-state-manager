import { Draft, Immutable } from 'immer';

export type SymbolTypes = 'STAGE' | 'SCENE' | 'TEXT' | 'IMAGE' | 'RECT';

export interface Style extends Partial<CSSStyleDeclaration> {
  id: string;
}

export interface Symbol {
  id: string;
  type: SymbolTypes;
  defaultLayout?: string;
  children?: string[];
  styles: Record<string, Style>;
}

export interface UI {
  activeStage: string;
  selectedSymbols: string[];
}

export type State = Immutable<{
  styles: Record<string, Style>;
  symbols: Record<string, Symbol>;
  ui: UI;
}>;

export type Processor<T extends object = object> = (
  draft: Draft<State>,
  payload: T
) => void;
