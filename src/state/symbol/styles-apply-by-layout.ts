import { State, Style } from 'state/types';
import { getSymbolStylesByLayout } from 'state/selectors';
import { pick } from 'remeda';

const positionKeys: (keyof Style)[] = [
  'top',
  'left',
  'width',
  'height',
  'rotate',
];

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
    const targetStyle =
      getSymbolStylesByLayout(symbolId, targetLayoutId)(draft) ?? {};

    draft.symbols[symbolId].styles[targetLayoutId] = {
      ...sourceStyle,
      ...pick(targetStyle, positionKeys), // keep target position
    };
  });

  return draft;
}
