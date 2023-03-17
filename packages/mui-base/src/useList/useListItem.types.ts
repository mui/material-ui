import { EventHandlers } from '../utils';

export interface UseListItemParameters<ItemValue> {
  /**
   * The list item.
   */
  item: ItemValue;
  /**
   * A ref to the list item's DOM element.
   */
  ref?: React.Ref<HTMLElement>;
}

interface UseListItemRootSlotOwnProps {
  // TODO: ARIA attributes should be added by the higher level component (Select, Menu, etc.)
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  'aria-selected': React.AriaAttributes['aria-selected'];
  id?: string;
  onClick: React.MouseEventHandler;
  onPointerOver: React.PointerEventHandler;
  role: React.AriaRole;
  tabIndex?: number;
}

export type UseListItemRootSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseListItemRootSlotOwnProps
> &
  UseListItemRootSlotOwnProps;

export interface UseListItemReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param otherHandlers event handlers for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseListItemRootSlotProps<TOther>;
  /**
   * If `true`, the current item is highlighted.
   */
  highlighted: boolean;
  /**
   * If `true`, the current item is selected.
   */
  selected: boolean;
  /**
   * The ref to the root element.
   */
  ref: ((instance: HTMLElement | null) => void) | null;
}
