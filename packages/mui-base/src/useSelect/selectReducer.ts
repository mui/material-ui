import {
  ListAction,
  ListActionContext,
  moveHighlight,
  listReducer,
  ListActionTypes,
} from '../useList';
import { ActionWithContext } from '../utils/useControllableReducer.types';
import { SelectAction, SelectActionTypes, SelectInternalState } from './useSelect.types';

export default function selectReducer<OptionValue>(
  state: SelectInternalState<OptionValue>,
  action: ActionWithContext<ListAction<OptionValue> | SelectAction, ListActionContext<OptionValue>>,
) {
  const { open } = state;
  const {
    context: { selectionMode },
  } = action;

  switch (action.type) {
    case SelectActionTypes.buttonClick: {
      const itemToHighlight =
        state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'start', action.context);

      return {
        ...state,
        open: !open,
        highlightedValue: !open ? itemToHighlight : null,
      };
    }

    case SelectActionTypes.buttonArrowKeyDown:
      if (action.key === 'ArrowDown') {
        const itemToHighlight =
          state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'start', action.context);

        return {
          ...state,
          open: true,
          highlightedValue: itemToHighlight,
        };
      }

      if (action.key === 'ArrowUp') {
        const itemToHighlight =
          state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'end', action.context);

        return {
          ...state,
          open: true,
          highlightedValue: itemToHighlight,
        };
      }

      break;

    default:
      break;
  }

  const newState: SelectInternalState<OptionValue> = listReducer(
    state,
    action as ActionWithContext<ListAction<OptionValue>, ListActionContext<OptionValue>>,
  );

  switch (action.type) {
    case ListActionTypes.keyDown:
      if (
        selectionMode === 'single' &&
        (action.event.key === 'Enter' || action.event.key === ' ' || action.event.key === 'Escape')
      ) {
        return {
          ...newState,
          open: false,
        };
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
