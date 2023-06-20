import { MenuAction, MenuActionTypes, MenuOpenState } from './useDropdownMenu.types';

export default function dropdownMenuReducer(
  state: MenuOpenState,
  action: MenuAction,
): MenuOpenState {
  switch (action.type) {
    case MenuActionTypes.blur:
      return { open: false };
    case MenuActionTypes.escapeKeyDown:
      return { open: false };
    case MenuActionTypes.itemClick:
      return { open: false };
    case MenuActionTypes.toggle:
      return { open: !state.open };
    case MenuActionTypes.open:
      return { open: true };
    case MenuActionTypes.close:
      return { open: false };
    default:
      throw new Error(`Unhandled action`);
  }
}
