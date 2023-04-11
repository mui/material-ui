import { EventHandlers } from '../utils/types';
import { UseButtonRootSlotProps } from '../useButton';

interface UseMenuItemRootSlotOwnProps {
  role: 'menuitem';
  tabIndex?: number;
  id?: string;
}

export type UseMenuItemRootSlotProps<TOther = {}> = TOther &
  UseMenuItemRootSlotOwnProps &
  UseButtonRootSlotProps<TOther>;

export interface UseMenuItemParameters {
  disabled?: boolean;
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
   * @default false
   */
  disabled: boolean;
  /**
   * If `true`, the component is being focused using keyboard.
   * @default false
   */
  focusVisible: boolean;
  /**
   * If `true`, the component is being highlighted.
   * @default false
   */
  highlighted: boolean;
}
