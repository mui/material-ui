/**
 * If `componentProps` is a function, calls it with the provided `ownerState`.
 * Otherwise, just returns `componentProps`.
 */
function resolveComponentProps<TProps, TOwnerState, TSlotState>(
  componentProps:
    | TProps
    | ((ownerState: TOwnerState, slotState?: TSlotState) => TProps)
    | undefined,
  ownerState: TOwnerState,
  slotState?: TSlotState,
): TProps | undefined {
  if (typeof componentProps === 'function') {
    return (componentProps as (ownerState: TOwnerState, slotState?: TSlotState) => TProps)(
      ownerState,
      slotState,
    );
  }

  return componentProps;
}

export default resolveComponentProps;
