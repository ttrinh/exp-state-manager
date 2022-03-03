import { Draft } from 'immer';

import { cleanObject } from 'lib/clean-object';
import { WithoutId } from 'lib/type-utils';
import { makeAction } from 'state/state-utils/make-action';
import { Style } from 'state/types';

const STYLES_UPDATE = '[STYLES] Update' as const;

type StylesUpdatePayload = Array<{
  symbolId: string;
  layoutId: string;
  style: WithoutId<Style>;
}>;

export const stylesUpdate = makeAction<
  typeof STYLES_UPDATE,
  StylesUpdatePayload
>({
  type: STYLES_UPDATE,
  processor: (draft, payload) => {
    payload.forEach(({ symbolId, layoutId, style }) => {
      const prevStyle = draft.symbols[symbolId].styles[layoutId];
      const s = cleanObject(style);

      draft.symbols[symbolId].styles[layoutId] = {
        ...prevStyle,
        ...s,
      } as Draft<Style>;
    });
  },
});
