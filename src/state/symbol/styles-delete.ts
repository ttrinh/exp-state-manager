import { omit } from 'remeda';
import { State } from 'state/types';

type StylesDeletePayload = Array<{
  symbolId: string;
  layoutId: string;
}>;

/**
 * Shallowly update styles of symbols
 */
export function stylesDelete(draft: State, payload: StylesDeletePayload) {
  payload.forEach(({ symbolId, layoutId }) => {
    draft.symbols[symbolId].styles = omit(draft.symbols[symbolId].styles, [
      layoutId,
    ]);
  });

  return draft;
}
