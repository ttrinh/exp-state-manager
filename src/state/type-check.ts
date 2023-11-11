import { Group, Stage, Element } from './types';

export const isGroupType = (
  element: Element | Stage | undefined
): element is Group | Stage =>
  element?.type === 'group' ||
  element?.type === 'scene' ||
  element?.type === 'stage';

export const isStage = (
  element: Element | Stage | undefined
): element is Stage => element?.type === 'stage';

export const isGroup = (
  element: Element | Stage | undefined
): element is Group => element?.type === 'group' || element?.type === 'scene';
