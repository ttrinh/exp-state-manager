import { Group, Stage, Symbol } from './types';

export const isGroupType = (
  symbol: Symbol | Stage | undefined
): symbol is Group | Stage =>
  symbol?.type === 'group' ||
  symbol?.type === 'scene' ||
  symbol?.type === 'stage';

export const isStage = (symbol: Symbol | Stage | undefined): symbol is Stage =>
  symbol?.type === 'stage';

export const isGroup = (symbol: Symbol | Stage | undefined): symbol is Group =>
  symbol?.type === 'group' || symbol?.type === 'scene';
