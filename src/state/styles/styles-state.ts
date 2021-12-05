import { CSSProperties } from '@mui/styled-engine';
import { moleculeFamily } from 'lib/molecule';

export type Unit = 'px' | 'percent';

export interface Styles extends CSSProperties {
  id: string;
  unit: Unit;
}

export const stylesState = moleculeFamily<Styles>('stylesState');
