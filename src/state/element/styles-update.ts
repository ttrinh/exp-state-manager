import { cleanObject } from 'lib/clean-object';
import { State, Style } from 'state/types';
import { WithoutId } from 'lib/type-utils';

type StylesUpdatePayload = Array<{
  elementId: string;
  layoutId: string;
  style: WithoutId<Style>;
}>;

/**
 * Shallowly update styles of elements
 */
export function stylesUpdate(draft: State, payload: StylesUpdatePayload) {
  payload.forEach(({ elementId, layoutId, style }) => {
    const prevStyle = draft.elements[elementId].styles[layoutId] ?? {};
    const s = cleanObject(style);

    draft.elements[elementId].styles[layoutId] = {
      ...prevStyle,
      ...s,
    };
  });

  return draft;
}
