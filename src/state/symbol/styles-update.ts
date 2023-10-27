import { cleanObject } from 'lib/clean-object';
import { State, Style } from 'state/types';
import { WithoutId } from 'lib/type-utils';

type StylesUpdatePayload = Array<{
  symbolId: string;
  layoutId: string;
  style: WithoutId<Style>;
}>;

/**
 * Shallowly update styles of symbols
 */
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
