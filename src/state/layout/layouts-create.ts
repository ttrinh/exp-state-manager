import { generateId } from 'lib/generate-id';
import { initial } from 'state/initial';
import { Layout, State } from 'state/types';

export type LayoutsCreatePayload = Array<{
  layout?: Layout;
}>;

export function layoutsCreate(draft: State, payload: LayoutsCreatePayload) {
  payload.forEach(({ layout = initial.layout }) => {
    const id = layout.id || generateId('layout');

    draft.layouts[id] = {
      ...layout,
      id,
    };
  });

  return draft;
}
