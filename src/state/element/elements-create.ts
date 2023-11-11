import { generateId } from 'lib/generate-id';
import { WithoutId } from 'lib/type-utils';
import { initial } from 'state/initial';
import { isGroupType } from 'state/type-check';
import { Stage, State, Style, Element } from 'state/types';

export type ElementsCreatePayload = Array<{
  parentId: string;
  element?: Element | Stage;
  /** base styles for all layouts */
  baseStyle?: WithoutId<Style>;
}>;

export function elementsCreate(draft: State, payload: ElementsCreatePayload) {
  payload.forEach(({ element = initial.element, parentId, baseStyle = {} }) => {
    // create element & styles
    const id = element.id || generateId('element');
    const layoutIds = Object.keys(draft.layouts);
    const styles = layoutIds.reduce((acc, layoutId) => {
      const predefinedStyles = element.styles[layoutId] ?? {};
      return {
        ...acc,
        [layoutId]: {
          ...initial.style,
          ...baseStyle,
          ...predefinedStyles,
        },
      };
    }, {});

    draft.elements[id] = {
      ...element,
      id,
      styles,
    };

    // append into parent
    if (parentId) {
      const parent = draft.elements[parentId];
      if (isGroupType(parent)) {
        const prevChildren = parent?.children ?? [];
        parent.children = prevChildren.concat(id);
      }
    }
  });

  return draft;
}
