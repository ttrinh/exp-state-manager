import { ActionFactory } from 'lib/event';

import { Actions } from 'state/action-processors';
import { stylesState } from 'state/styles/styles-state';
import { CREATE_SYMBOLS, EDIT_SYMBOLS, REMOVE_SYMBOLS } from './symbol-actions';
import { symbolState } from './symbol-state';

export const symbolProcessors: ActionFactory<Actions> = async (
  transactionInterface,
  action
) => {
  const { get, set } = transactionInterface;

  switch (action.type) {
    case CREATE_SYMBOLS: {
      console.log('CREATE', action.data);

      const { symbols, parentId } = action.data;
      symbols.forEach((symbol) => {
        symbolState.addMolecule(symbol.id, symbol);

        const styleId = `${symbol.id}_styles`;
        stylesState.addMolecule(styleId, {
          id: styleId,
          top: '50px',
          left: '50px',
          width: '120px',
          height: '120px',
        });
      });

      if (parentId) {
        const parentChildrenAtom = symbolState
          .getMolecule(parentId)
          .getAtom('children');
        const prevChildren = get(parentChildrenAtom);

        if (prevChildren) {
          const symbolIds = symbols.map((s) => s.id);
          set(parentChildrenAtom, prevChildren.concat(symbolIds));
        }
      }

      // NOT YET SUPPORT SELECTOR
      // const newPosition = get(
      //   stylesState
      //     .getMolecule(action.data[0].id)
      //     .getAtoms(['top', 'left', 'width', 'height'])
      // );
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
