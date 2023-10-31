import { CSSProperties, ReactNode } from 'react';

export interface BaseSymbol {
  id: string;
  symbolIdRef?: string; // reference to original copied symbol if any
  name?: string;
  styles: Record<string, Style>;
  interactions?: Record<string, Interaction>;
  timeline?: Record<string, Timeline>;
}

export type Symbol = BasicSymbol | Group;

export interface BasicSymbol extends BaseSymbol {
  type: 'image' | 'text' | 'box';
}

export interface Group extends BaseSymbol {
  type: 'group' | 'scene';
  children?: string[];
}

export interface Stage extends BaseSymbol {
  type: 'stage';
  children?: string[];
  layout?: Layout;
}

export interface Style extends CSSProperties {
  // id: string;
}

/******************
 * Interaction
 ******************/

export interface Interaction {
  id: string;
  layoutIdRef: string;
  interactionList: InteractionItem[];
}

export type InteractionItem =
  | InteractionLink
  | InteractionGoTo
  | InteractionTrack;

interface InteractionBase {
  trigger: 'click' | 'mouseover' | 'mouseout' | 'onShow' | 'onHide';
}

export interface InteractionLink extends InteractionBase {
  action: 'link';
  href: string;
}

export interface InteractionGoTo extends InteractionBase {
  action: 'goTo';
  time: number;
}

export interface InteractionTrack extends InteractionBase {
  action: 'track';
  url: string;
  script: string;
}

/******************
 * Timeline
 ******************/

export interface Timeline {
  id: string;
  layoutIdRef: string;
  name?: string;
  animations: Animation[];
}

export interface Animation {
  name?: string;
  time: number;
  easing: string;
  styles: Style;
}

/******************
 * Layout
 ******************/

export interface Layout {
  id: string;
  deliverable: string;
  name?: string;
  w: string;
  h: string;
  minW?: string;
  maxW?: string;
  minH?: string;
  maxH?: string;
}

export interface Addon {
  id: string;
  name: string;
  validation: (passingAppState: { state: State; action: unknown }) => void;
  sizes: string[];
  placement:
    | 'free'
    | 'MainPanel.Images'
    | 'MainPanel.Text'
    | 'DesignPanel.Images';
  outerDisplay: (passingAppState: {
    state: State;
    action: unknown;
    selector: unknown;
  }) => ReactNode; // display this component in the `placement` above. Ex: a button to go into innerDisplay, or a search component
  innerDisplay?: (passingAppState: {
    state: State;
    action: unknown;
    selector: unknown;
  }) => ReactNode;
}

export interface UI {
  // indicate which layout's size is active
  activeStage: string;

  // mark selected symbols on stage
  selectedSymbols: string[];

  // indicate which layout's size is active
  activeLayout: string;
}

export type State = {
  symbols: Record<string, Symbol | Stage>;
  layouts: Record<string, Layout>;
  ui: UI;
};
