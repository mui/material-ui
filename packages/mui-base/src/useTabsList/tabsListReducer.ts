import { ListState, ListAction, ListActionAddOn, listReducer, ListActionTypes } from '../useList';
import { ActionContext } from '../utils/useControllableReducer.types';
import { TabsListActionTypes, ValueChangeAction } from './useTabsList.types';

export type TabsListActionContext = ActionContext<
  ListActionAddOn<string | number> & { selectionFollowsFocus: boolean }
>;

export default function tabsListReducer(
  state: ListState<string | number>,
  action: (ListAction<string | number> | ValueChangeAction) & TabsListActionContext,
) {
  if (action.type === TabsListActionTypes.valueChange) {
    return {
      ...state,
      highlightedValue: action.value,
    };
  }

  const newState = listReducer(state, action);

  const {
    context: { selectionFollowsFocus },
  } = action;

  if (action.type === ListActionTypes.itemsChange) {
    return {
      ...newState,
      highlightedValue: newState.selectedValues[0] ?? null,
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
