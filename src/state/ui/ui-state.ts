import { molecule } from 'lib/molecule';

export interface UI {
  activeStage: string;
}

export const uiState = molecule<UI>('uiState', {
  activeStage: '',
});
