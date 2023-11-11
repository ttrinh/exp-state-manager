import { omit } from 'remeda';
import { State } from 'state/types';

type StylesDeletePayload = Array<{
  elementId: string;
  layoutId: string;
}>;

/**
 * Shallowly update styles of elements
 */
export function stylesDelete(draft: State, payload: StylesDeletePayload) {
  payload.forEach(({ elementId, layoutId }) => {
    draft.elements[elementId].styles = omit(draft.elements[elementId].styles, [
      layoutId,
    ]);
  });

  return draft;
}
