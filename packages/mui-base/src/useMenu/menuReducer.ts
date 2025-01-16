import { ListAction, ListActionContext, ListActionTypes, listReducer } from '../useList';
import { ActionWithContext } from '../utils/useControllableReducer.types';
import { MenuInternalState } from './useMenu.types';

export type MenuActionContext = ListActionContext<string> & {
  listboxRef: React.RefObject<HTMLElement | null>;
};

export function menuReducer(
  state: MenuInternalState,
  action: ActionWithContext<ListAction<string>, MenuActionContext>,
) {
  if (action.type === ListActionTypes.itemHover) {
    return {
      ...state,
      highlightedValue: action.item,
    };
  }

  const newState = listReducer(state, action);

  // make sure an item is always highlighted
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return {
      ...newState,
      highlightedValue: action.context.items[0],
    };
  }

  if (action.type === ListActionTypes.keyDown) {
    if (action.event.key === 'Escape') {
      return {
        ...newState,
        open: false,
      };
    }
  }

  if (action.type === ListActionTypes.blur) {
    if (!action.context.listboxRef.current?.contains(action.event.relatedTarget)) {
      // To prevent the menu from closing when the focus leaves the menu to the button.
      // For more details, see https://github.com/mui/material-ui/pull/36917#issuecomment-1566992698
      const listboxId = action.context.listboxRef.current?.getAttribute('id');
      const controlledBy = action.event.relatedTarget?.getAttribute('aria-controls');
      if (listboxId && controlledBy && listboxId === controlledBy) {
        return newState;
      }

      return {
        ...newState,
        open: false,
        highlightedValue: action.context.items[0],
      };
    }
  }

  return newState;
}
