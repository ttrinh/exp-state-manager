import { CSSProperties } from '@mui/styled-engine';
import { moleculeFamily } from 'lib/molecule';

export interface Styles extends CSSProperties {
  id: string;
}

export const stylesState = moleculeFamily<Styles>('stylesState');
