import {
  ListAction,
  ListActionContext,
  moveHighlight,
  listReducer,
  ListActionTypes,
} from '../useList';
import { ActionWithContext } from '../utils/useControllableReducer.types';
import { SelectAction, SelectActionTypes, SelectInternalState } from './useSelect.types';

export function selectReducer<OptionValue>(
  state: SelectInternalState<OptionValue>,
  action: ActionWithContext<ListAction<OptionValue> | SelectAction, ListActionContext<OptionValue>>,
) {
  const { open } = state;
  const {
    context: { selectionMode },
  } = action;

  if (action.type === SelectActionTypes.buttonClick) {
    const itemToHighlight =
      state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'start', action.context);

    return {
      ...state,
      open: !open,
      highlightedValue: !open ? itemToHighlight : null,
    };
  }

  const newState: SelectInternalState<OptionValue> = listReducer(
    state,
    action as ActionWithContext<ListAction<OptionValue>, ListActionContext<OptionValue>>,
  );

  switch (action.type) {
    case ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === 'Escape') {
          return {
            ...newState,
            open: false,
          };
        }

        if (
          selectionMode === 'single' &&
          (action.event.key === 'Enter' || action.event.key === ' ')
        ) {
          return {
            ...newState,
            open: false,
          };
        }
      } else {
        if (
          action.event.key === 'Enter' ||
          action.event.key === ' ' ||
          action.event.key === 'ArrowDown'
        ) {
          return {
            ...state,
            open: true,
            highlightedValue:
              state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'start', action.context),
          };
        }

        if (action.event.key === 'ArrowUp') {
          return {
            ...state,
            open: true,
            highlightedValue:
              state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'end', action.context),
          };
        }
      }

      break;

    case ListActionTypes.itemClick:
      if (selectionMode === 'single') {
        return {
          ...newState,
          open: false,
        };
      }

      break;

    case ListActionTypes.blur:
      return {
        ...newState,
        open: false,
      };

    default:
      return newState;
  }

  return newState;
}
