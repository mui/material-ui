import { type MenuContextValue } from '../useMenu/MenuContext';

export interface UseDropdownMenuParameters {
  /**
   * If `true`, the menu is initially open.
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange?: (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    open: boolean,
  ) => void;
  /**
   * Allows to control whether the menu is open.
   * This is a controlled counterpart of `defaultOpen`.
   */
  open?: boolean;
}

export interface UseDropdownMenuReturnValue {
  /**
   * The value to be passed into the MenuProvider.
   */
  contextValue: MenuContextValue;
  /**
   * If `true`, the dropdown is open.
   */
  open: boolean;
}

export const MenuActionTypes = {
  blur: 'menu:blur',
  escapeKeyDown: 'menu:escapeKeyDown',
  itemClick: 'menu:itemClick',
  toggle: 'menu:toggle',
  open: 'menu:open',
  close: 'menu:close',
} as const;

interface MenuBlurAction {
  type: typeof MenuActionTypes.blur;
  event: React.FocusEvent;
}

interface MenuEscapeKeyDownAction {
  type: typeof MenuActionTypes.escapeKeyDown;
  event: React.KeyboardEvent;
}

interface MenuItemClickAction {
  type: typeof MenuActionTypes.itemClick;
  event: React.MouseEvent;
}

interface MenuToggleAction {
  type: typeof MenuActionTypes.toggle;
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
}

interface MenuOpenAction {
  type: typeof MenuActionTypes.open;
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
}

interface MenuCloseAction {
  type: typeof MenuActionTypes.close;
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
}

export type MenuAction =
  | MenuBlurAction
  | MenuEscapeKeyDownAction
  | MenuItemClickAction
  | MenuToggleAction
  | MenuOpenAction
  | MenuCloseAction;

export type MenuOpenState = { open: boolean };
