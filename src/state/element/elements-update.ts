import { Without } from 'lib/type-utils';
import { Stage, State, Element } from 'state/types';

type ElementsUpdatePayload = Array<{
  elementId: string;
  partialElement:
    | Without<Element, 'id' | 'type' | 'styles' | 'interactions' | 'timelines'>
    | Without<Stage, 'children'>;
}>;

/**
 * Shallowly update multiple elements' values
 */
export function elementsUpdate(draft: State, payload: ElementsUpdatePayload) {
  payload.forEach(({ elementId, partialElement }) => {
    draft.elements[elementId] = {
      ...draft.elements[elementId],
      ...partialElement,
    };
  });

  return draft;
}
