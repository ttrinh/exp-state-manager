import { Draft } from 'immer';

import { makeAction } from 'state/state-utils/make-action';
import { UI } from 'state/types';

const UI_UPDATE = '[UI] Update' as const;

type UIUpdatePayload = Partial<UI>;

export const uiUpdate = makeAction<typeof UI_UPDATE, UIUpdatePayload>({
  type: UI_UPDATE,
  processor: (draft, payload) => {
    draft.ui = {
      ...draft.ui,
      ...payload,
    } as Draft<UI>;
  },
});
