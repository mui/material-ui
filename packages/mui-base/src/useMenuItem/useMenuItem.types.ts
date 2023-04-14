import { EventHandlers } from '../utils/types';
import { UseButtonRootSlotProps } from '../useButton';

interface UseMenuItemRootSlotOwnProps {
  role: 'menuitem';
  tabIndex?: number;
  id?: string;
}

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  label?: string;
  ref: React.RefObject<HTMLElement>;
}

export type UseMenuItemRootSlotProps<TOther = {}> = TOther &
  UseMenuItemRootSlotOwnProps &
  UseButtonRootSlotProps<TOther>;

export interface UseMenuItemParameters {
  disabled?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<any>;
  ref: React.Ref<any>;
  label?: string;
}

export interface UseMenuItemReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param otherHandlers event handlers for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseMenuItemRootSlotProps<TOther>;
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
  ref: ((instance: unknown) => void) | null;
  /**
   * Total number of items in the menu.
   */
  totalItemCount: number;
}
