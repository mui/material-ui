import { EventHandlers } from '../utils';

export interface UseListItemParameters<ItemValue> {
  /**
   * If `true`, the list item will dispatch the `itemHover` action on pointer over.
   * Since the use cases for it are rare, it's disabled by default.
   * It could be used to mimic the native `select` behavior, which highlights the hovered item.
   *
   * @default false
   */
  handlePointerOverEvents?: boolean;
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
  id?: string;
  onClick: React.MouseEventHandler;
  onPointerOver: React.PointerEventHandler | undefined;
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
