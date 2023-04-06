import { ListAction, ListActionAddOn, ListActionTypes, listReducer } from '../useList';
import { MenuInternalState } from './useMenu.types';

export default function menuReducer(
  state: MenuInternalState,
  action: ListAction<string, MenuInternalState> &
    ListActionAddOn<string> & { listboxRef: React.RefObject<HTMLElement> },
) {
  if (action.type === ListActionTypes.itemHover || action.type === ListActionTypes.setState) {
    return state;
  }

  const newState = listReducer(state, action);

  // make sure an item is always highlighted
  if (newState.highlightedValue === null && action.props.current!.items.length > 0) {
    return {
      ...newState,
      highlightedValue: action.props.current!.items[0],
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
    if (!action.listboxRef.current?.contains(action.event.relatedTarget)) {
      return {
        ...newState,
        open: false,
        highlightedValue: action.props.current!.items[0],
      };
    }
  }

  return newState;
}
