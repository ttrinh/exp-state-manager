import { State, UI } from 'state/types';

type UIUpdatePayload = Partial<UI>;

export function uiUpdate(draft: State, payload: UIUpdatePayload) {
  draft.ui = {
    ...draft.ui,
    ...payload,
  };

  return draft;
}
