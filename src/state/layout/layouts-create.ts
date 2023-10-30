import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { getUIValue } from 'state/selectors';
import { stylesCreate } from 'state/symbol/styles-create';
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
      Object.keys(draft.symbols).map((symbolId) => {
        const currentLayoutStyle =
          draft.symbols[symbolId]?.styles[activeLayout] ?? {};
        stylesCreate(draft, [
          { symbolId, layoutId: id, style: currentLayoutStyle },
        ]);
      });
    }
  });

  return draft;
}
