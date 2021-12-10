import { ActionFactory } from 'lib/event';

import { Actions } from 'state/action-processors';
import { stylesState } from 'state/styles/styles-state';
import { CREATE_SYMBOLS, EDIT_SYMBOLS, REMOVE_SYMBOLS } from './symbol-actions';
import { symbolState } from './symbol-state';

export const symbolProcessors: ActionFactory<Actions> = async (
  transactionInterface,
  action
) => {
  const { get } = transactionInterface;

  switch (action.type) {
    case CREATE_SYMBOLS: {
      action.data.forEach((data) => {
        const symbol = data;
        symbolState.addMolecule(symbol.id, symbol);
        stylesState.addMolecule(symbol.id, {
          id: symbol.id,
          unit: 'px',
          top: '50px',
          left: '50px',
          width: '120px',
          height: '120px',
        });
      });

      const newSymbol = get(
        symbolState.getMolecule(action.data[0].id).getAtom('id')
      );
      // NOT YET SUPPORT SELECTOR
      // const newPosition = get(
      //   stylesState
      //     .getMolecule(action.data[0].id)
      //     .getAtoms(['top', 'left', 'width', 'height'])
      // );
      const newWidth = get(
        stylesState.getMolecule(action.data[0].id).getAtom('width')
      );
      console.log(newSymbol, newWidth);
      break;
    }

    case EDIT_SYMBOLS: {
      console.log(EDIT_SYMBOLS, action.data);
      break;
    }

    case REMOVE_SYMBOLS: {
      console.log(REMOVE_SYMBOLS, action.data);
      break;
    }

    default:
      break;
  }
};
