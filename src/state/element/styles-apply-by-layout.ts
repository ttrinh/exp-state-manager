import {
  getElementPositionByLayout,
  getElementStylesByLayout,
} from 'state/selectors';
import { State } from 'state/types';

type StylesApplyByLayoutPayload = Array<{
  elementId: string;
  sourceLayoutId: string;
  targetLayoutId: string;
}>;

/**
 * Shallowly apply styles of a target layout to the source layout
 */
export function stylesApplyByLayout(
  draft: State,
  payload: StylesApplyByLayoutPayload
) {
  payload.forEach(({ elementId, targetLayoutId, sourceLayoutId }) => {
    const sourceStyle =
      getElementStylesByLayout(elementId, sourceLayoutId)(draft) ?? {};
    const targetPosition =
      getElementPositionByLayout(elementId, targetLayoutId)(draft) ?? {};

    draft.elements[elementId].styles[targetLayoutId] = {
      ...sourceStyle,
      ...targetPosition, // keep target position
    };
  });

  return draft;
}
