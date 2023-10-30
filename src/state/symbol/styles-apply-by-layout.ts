import { State } from 'state/types';
import { getSymbolStylesByLayout } from 'state/selectors';

type StylesApplyByLayoutPayload = Array<{
  symbolId: string;
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
  payload.forEach(({ symbolId, targetLayoutId, sourceLayoutId }) => {
    const style =
      getSymbolStylesByLayout(symbolId, sourceLayoutId)(draft) ?? {};

    draft.symbols[symbolId].styles[targetLayoutId] = style;
  });

  return draft;
}
