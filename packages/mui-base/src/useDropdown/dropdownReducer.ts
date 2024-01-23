import { DropdownAction, DropdownActionTypes, DropdownState } from './useDropdown.types';

function isUpOrDownKey(key: string): key is 'ArrowUp' | 'ArrowDown' {
  return key === 'ArrowUp' || key === 'ArrowDown';
}

function getKeyboardEventKey(
  event:
    | React.KeyboardEvent<Element>
    | React.MouseEvent<Element, MouseEvent>
    | React.FocusEvent<Element, Element>
    | null,
): 'ArrowUp' | 'ArrowDown' | undefined {
  return event && 'key' in event && isUpOrDownKey(event.key) ? event.key : undefined;
}

export function dropdownReducer(state: DropdownState, action: DropdownAction): DropdownState {
  switch (action.type) {
    case DropdownActionTypes.blur:
      return { open: false };
    case DropdownActionTypes.escapeKeyDown:
      return { open: false };
    case DropdownActionTypes.toggle:
      return { open: !state.open };
    case DropdownActionTypes.open:
      return {
        open: true,
        keyPressedToOpen: getKeyboardEventKey(action.event),
      };
    case DropdownActionTypes.close:
      return { open: false };
    default:
      throw new Error(`Unhandled action`);
  }
}
