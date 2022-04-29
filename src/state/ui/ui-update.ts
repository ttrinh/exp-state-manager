import { Draft } from 'immer';

import { makeAction } from 'state/state-utils/make-action';
import { UI } from 'state/types';

type UIUpdatePayload = Partial<UI>;

export const uiUpdate = makeAction<UIUpdatePayload>({
  type: '[UI] Update',
  processor: (draft, payload) => {
    draft.ui = {
      ...draft.ui,
      ...payload,
    } as Draft<UI>;
  },
});
