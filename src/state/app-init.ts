import { State } from 'state/types';
import { layoutsCreate } from './layout/layouts-create';
import { uiUpdate } from './ui/ui-update';
import { symbolsCreate } from './symbol/symbols-create';
import { layout1, layout2, mockStage, mockSymbols } from 'mocks';

export function appInit(draft: State) {
  layoutsCreate(draft, [{ layout: layout1 }, { layout: layout2 }]);
  uiUpdate(draft, { activeLayout: layout1.id });
  symbolsCreate(draft, mockStage);
  symbolsCreate(draft, mockSymbols);
  return draft;
}
