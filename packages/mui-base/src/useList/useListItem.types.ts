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
}

interface UseListItemRootSlotOwnProps {
  onClick: React.MouseEventHandler;
  onPointerOver: React.PointerEventHandler | undefined;
  tabIndex?: number;
}

export type UseListItemRootSlotProps<ExternalProps = {}> = ExternalProps &
  UseListItemRootSlotOwnProps;

export interface UseListItemReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps additional props to be forwarded to the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseListItemRootSlotProps<ExternalProps>;
  /**
   * If `true`, the current item is highlighted.
   */
  highlighted: boolean;
  /**
   * If `true`, the current item is selected.
   */
  selected: boolean;
}
