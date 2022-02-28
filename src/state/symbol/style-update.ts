import { Draft } from 'immer';

import { cleanObject } from 'lib/clean-object';
import { WithoutId } from 'lib/type-utils';
import { Processor, Style } from 'state/types';

export const STYLE_UPDATE = '[STYLE] Update' as const;

export type StyleUpdatePayload = Array<{
  symbolId: string;
  layoutId: string;
  style: WithoutId<Style>;
}>;

export type StyleUpdate = {
  type: typeof STYLE_UPDATE;
  payload: StyleUpdatePayload;
};

export const styleUpdateProcessor: Processor<StyleUpdatePayload> = (
  draft,
  payload
) => {
  payload.forEach(({ symbolId, layoutId, style }) => {
    const prevStyle = draft.symbols[symbolId].styles[layoutId];
    const s = cleanObject(style);

    draft.symbols[symbolId].styles[layoutId] = {
      ...prevStyle,
      ...s,
    } as Draft<Style>;
  });
};
