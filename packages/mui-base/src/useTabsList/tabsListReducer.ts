import { ListState, ListAction, ListActionAddOn, listReducer, ListActionTypes } from '../useList';

export default function tabsListReducer(
  state: ListState<string | number>,
  action: ListAction<string | number, ListState<string | number>> &
    ListActionAddOn<string | number> & { selectionFollowsFocus: boolean },
) {
  const newState = listReducer(state, action);

  const { selectionFollowsFocus } = action;

  if (action.type === ListActionTypes.itemsChange) {
    return {
      ...newState,
      highlightedValue: newState.selectedValues[0] ?? null,
    };
  }

  if (action.type === ListActionTypes.setState && action.value.selectedValues != null) {
    return {
      ...newState,
      highlightedValue: action.value.selectedValues[0],
    };
  }

  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return {
      ...newState,
      selectedValues: [newState.highlightedValue],
    };
  }

  return newState;
}
