import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { getUIValue } from 'state/selectors';
import { stylesCreate } from 'state/element/styles-create';
import { Layout, State } from 'state/types';

export type LayoutsCreatePayload = Array<{
  layout?: Layout;
}>;

export function layoutsCreate(draft: State, payload: LayoutsCreatePayload) {
  const activeLayout = getUIValue('activeLayout')(draft);

  payload.forEach(({ layout = initial.layout }) => {
    const id = layout.id || generateId('layout');

    // create the new layout in layouts object
    draft.layouts[id] = {
      ...layout,
      id,
    };

    if (activeLayout) {
      Object.keys(draft.elements).map((elementId) => {
        const currentLayoutStyle =
          draft.elements[elementId]?.styles[activeLayout] ?? {};
        stylesCreate(draft, [
          { elementId, layoutId: id, style: currentLayoutStyle },
        ]);
      });
    }
  });

  return draft;
}
