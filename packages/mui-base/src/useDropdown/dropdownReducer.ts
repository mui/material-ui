import type { DropdownAction, DropdownState } from './useDropdown.types';
import { DropdownActionTypes } from './useDropdown.types';

export function dropdownReducer(state: DropdownState, action: DropdownAction): DropdownState {
  switch (action.type) {
    case DropdownActionTypes.blur:
      return { open: false, changeReason: action.event };
    case DropdownActionTypes.escapeKeyDown:
      return { open: false, changeReason: action.event };
    case DropdownActionTypes.toggle:
      return { open: !state.open, changeReason: action.event };
    case DropdownActionTypes.open:
      return { open: true, changeReason: action.event };
    case DropdownActionTypes.close:
      return { open: false, changeReason: action.event };
    default:
      throw new Error(`Unhandled action`);
  }
}
