import { CSSProperties, ReactNode } from 'react';

interface BasicElement {
  id: string;
  type: string;
  elementIdRef?: string; // reference to original copied element if any
  name?: string;
  styles: Record<string, Style>;
  attributes?: Record<string, Attribute>;
  interactions?: Record<string, Interaction>;
  timelines?: Record<string, Timeline>;
}

export type Element = BasicElement | Group;

export interface Group extends BasicElement {
  type: 'group' | 'scene';
  children?: string[];
}

export interface Stage extends BasicElement {
  type: 'stage';
  children?: string[];
  layout?: Layout;
}

export interface Style extends CSSProperties {
  // id: string;
}

export interface Attribute extends Record<string, unknown> {
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

  // mark selected elements on stage
  selectedElements: string[];

  // indicate which layout's size is active
  activeLayout: string;
}

export type State = {
  elements: Record<string, Element | Stage>;
  layouts: Record<string, Layout>;
  ui: UI;
};

// Temporary session state while working on a campaign.
export type SessionUI = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
};

export type SessionState = {
  ui: SessionUI;
};
