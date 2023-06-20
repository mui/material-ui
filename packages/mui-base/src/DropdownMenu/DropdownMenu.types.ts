export interface DropdownMenuProps {
  children: React.ReactNode;
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
