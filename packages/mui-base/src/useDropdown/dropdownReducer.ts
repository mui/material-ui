import { DropdownAction, DropdownActionTypes, DropdownState } from './useDropdown.types';

export function dropdownReducer(state: DropdownState, action: DropdownAction): DropdownState {
  switch (action.type) {
    case DropdownActionTypes.blur:
      return { open: false };
    case DropdownActionTypes.escapeKeyDown:
      return { open: false };
    case DropdownActionTypes.toggle:
      return { open: !state.open };
    case DropdownActionTypes.open:
      return { open: true };
    case DropdownActionTypes.close:
      return { open: false };
    default:
      throw new Error(`Unhandled action`);
  }
}
