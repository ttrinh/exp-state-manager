import { CSSProperties } from 'react';

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
  id: string;
  layoutIdRef?: string;
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

interface InteractionLink extends InteractionBase {
  action: 'link';
  href: string;
}

interface InteractionGoTo extends InteractionBase {
  action: 'goTo';
  time: number;
}

interface InteractionTrack extends InteractionBase {
  action: 'track';
  url: string;
  script: string;
}

/******************
 * Timeline
 ******************/

interface Timeline {
  id: string;
  layoutIdRef: string;
  name?: string;
  animations: Animation[];
}

interface Animation {
  name?: string;
  time: number;
  easing: string;
  style: Style;
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
  symbols: Record<string, Symbol | Stage>;
  layouts: Layouts;
  ui: UI;
};
