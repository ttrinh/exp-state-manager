import { Draft, Immutable } from 'immer';
import { UndoState } from 'zundo';

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

export type State = UndoState &
  Immutable<{
    styles: Record<string, Style>;
    symbols: Record<string, Symbol>;
    ui: UI;
  }>;

export type Processor<T> = (draft: Draft<State>, payload: T) => void;
