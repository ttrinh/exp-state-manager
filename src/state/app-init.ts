import { State } from 'state/types';
import { layoutsCreate } from './layout/layouts-create';
import { uiUpdate } from './ui/ui-update';
import { elementsCreate } from './element/elements-create';
import { layout1, layout2, mockStage, mockElements } from 'mocks';

export function appInit(draft: State) {
  layoutsCreate(draft, [{ layout: layout1 }, { layout: layout2 }]);
  uiUpdate(draft, { activeLayout: layout1.id });
  elementsCreate(draft, mockStage);
  elementsCreate(draft, mockElements);
  return draft;
}
