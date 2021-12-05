import { SymbolActions } from './symbol/symbol-actions';
import { symbolProcessors } from './symbol/symbol-processors';

export type Actions = SymbolActions;

export const actionProcessors = ((props: any, e: CustomEvent<Actions>) => {
  console.log(props);
  symbolProcessors(e.detail);
}) as EventListener;
