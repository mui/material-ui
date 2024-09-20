import { UseButtonRootSlotProps } from '../useButton';
import { MuiCancellableEventHandler } from '../utils/MuiCancellableEvent';

interface UseMenuItemRootSlotOwnProps {
  id: string | undefined;
  role: 'menuitem';
  ref: React.RefCallback<Element> | null;
}

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  label?: string;
  ref: React.RefObject<HTMLElement | null>;
}

export type UseMenuItemRootSlotProps<ExternalProps = {}> = ExternalProps &
  UseMenuItemRootSlotOwnProps &
  UseButtonRootSlotProps<ExternalProps> & {
    onClick: MuiCancellableEventHandler<React.MouseEvent>;
  };

export interface UseMenuItemParameters {
  disabled?: boolean;
  id?: string;
  label?: string;
  onClick?: React.MouseEventHandler<any>;
  rootRef: React.Ref<Element>;
  /**
   * If `true`, the menu item won't receive focus when the mouse moves over it.
   *
   * @default false
   */
  disableFocusOnHover?: boolean;
}

export interface UseMenuItemReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps event handlers for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseMenuItemRootSlotProps<ExternalProps>;
  /**
   * If `true`, the component is disabled.
   */
  disabled: boolean;
  /**
   * If `true`, the component is being focused using keyboard.
   */
  focusVisible: boolean;
  /**
   * If `true`, the component is being highlighted.
   */
  highlighted: boolean;
  /**
   * 0-based index of the item in the menu.
   */
  index: number;
  /**
   * The ref to the component's root DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
  /**
   * Total number of items in the menu.
   */
  totalItemCount: number;
}
