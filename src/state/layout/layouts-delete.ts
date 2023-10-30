import { difference, omit } from 'remeda';
import { getLayoutIds, getUIValue } from 'state/selectors';
import { stylesDelete } from 'state/symbol/styles-delete';
import { State } from 'state/types';
import { uiUpdate } from 'state/ui/ui-update';

export type LayoutsDeletePayload = string[];

export function layoutsDelete(draft: State, payload: LayoutsDeletePayload) {
  const activeLayout = getUIValue('activeLayout')(draft);
  const layoutIds = getLayoutIds(draft);

  // no delete on the last layout
  if (payload.length === layoutIds.length) {
    return draft;
  }

  // remove the style layout from the symbol object
  payload.forEach((layoutId) => {
    Object.keys(draft.symbols).map((symbolId) => {
      stylesDelete(draft, [{ symbolId, layoutId }]);
    });
  });

  // reset UI `activeLayout`
  if (payload.includes(activeLayout)) {
    const selectableLayoutId = difference(
      Object.keys(draft.layouts),
      payload
    )[0];

    if (selectableLayoutId) {
      uiUpdate(draft, { activeLayout: selectableLayoutId });
    }
  }

  // remove the layout in layouts object
  draft.layouts = omit(draft.layouts, payload);

  return draft;
}
