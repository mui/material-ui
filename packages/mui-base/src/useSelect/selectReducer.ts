import {
  ListAction,
  ListActionAddOn,
  moveHighlight,
  listReducer,
  ListActionTypes,
} from '../useList';
import { SelectAction, SelectActionTypes, SelectInternalState } from './useSelect.types';

export default function selectReducer<OptionValue>(
  state: SelectInternalState<OptionValue>,
  action: (ListAction<OptionValue, SelectInternalState<OptionValue>> | SelectAction) &
    ListActionAddOn<OptionValue> & { multiple: boolean },
) {
  const { open } = state;
  const { multiple: actionMultiple } = action;

  switch (action.type) {
    case SelectActionTypes.buttonClick: {
      const itemToHighlight =
        state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'start', action.props.current!);

      return {
        ...state,
        open: !open,
        highlightedValue: !open ? itemToHighlight : null,
      };
    }

    case SelectActionTypes.buttonArrowKeyDown:
      if (action.key === 'ArrowDown') {
        const itemToHighlight =
          state.selectedValues[0] ??
          moveHighlight<OptionValue>(null, 'start', action.props.current!);

        return {
          ...state,
          open: true,
          highlightedValue: itemToHighlight,
        };
      }

      if (action.key === 'ArrowUp') {
        const itemToHighlight =
          state.selectedValues[0] ?? moveHighlight<OptionValue>(null, 'end', action.props.current!);

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
    action as ListAction<OptionValue, SelectInternalState<OptionValue>> &
      ListActionAddOn<OptionValue>,
  );

  switch (action.type) {
    case ListActionTypes.keyDown:
      if (
        !actionMultiple &&
        (action.event.key === 'Enter' || action.event.key === ' ' || action.event.key === 'Escape')
      ) {
        return {
          ...newState,
          open: false,
        };
      }

      break;

    case ListActionTypes.itemClick:
      if (!actionMultiple) {
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
