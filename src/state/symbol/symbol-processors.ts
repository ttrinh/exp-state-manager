import { Actions } from 'state/action-processors';
import { CREATE_SYMBOLS, EDIT_SYMBOLS, REMOVE_SYMBOLS } from './symbol-actions';

export const symbolProcessors = (action: Actions) => {
  switch (action.type) {
    case CREATE_SYMBOLS: {
      console.log(action.type, action.data);
      break;
    }

    case EDIT_SYMBOLS: {
      console.log(action.type, action.data);
      break;
    }

    case REMOVE_SYMBOLS: {
      console.log(action.type, action.data);
      break;
    }

    default:
      break;
  }
};
