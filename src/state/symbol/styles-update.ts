import { cleanObject } from 'lib/clean-object';
import { WithoutId } from 'lib/type-utils';
import { State, Style } from 'state/types';

type StylesUpdatePayload = Array<{
  symbolId: string;
  layoutId: string;
  style: WithoutId<Style>;
}>;

export function stylesUpdate(draft: State, payload: StylesUpdatePayload) {
  payload.forEach(({ symbolId, layoutId, style }) => {
    const prevStyle = draft.symbols[symbolId].styles[layoutId];
    const s = cleanObject(style);

    draft.symbols[symbolId].styles[layoutId] = {
      ...prevStyle,
      ...s,
    };
  });

  return draft;
}
