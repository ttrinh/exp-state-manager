import { Draft } from 'immer';
import { State } from 'state/types';
import { GenericAction, MakeAction } from './make-action';

export const processReducerFromAction = (
  draft: Draft<State>,
  action: GenericAction,
  actionMap: MakeAction<any, any>[]
) => {
  for (const item of actionMap) {
    if (item.type === action.type) {
      item.processor(draft, action.payload);
      break;
    }
  }
};
