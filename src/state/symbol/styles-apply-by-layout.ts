import {
  getSymbolPositionByLayout,
  getSymbolStylesByLayout,
} from 'state/selectors';
import { State } from 'state/types';

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
    const sourceStyle =
      getSymbolStylesByLayout(symbolId, sourceLayoutId)(draft) ?? {};
    const targetPosition =
      getSymbolPositionByLayout(symbolId, targetLayoutId)(draft) ?? {};

    draft.symbols[symbolId].styles[targetLayoutId] = {
      ...sourceStyle,
      ...targetPosition, // keep target position
    };
  });

  return draft;
}
