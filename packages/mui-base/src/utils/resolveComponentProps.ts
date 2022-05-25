/**
 * If `componentProps` is a function, calls it with the provided `ownerState`.
 * Otherwise, just returns `componentProps`.
 */
export default function resolveComponentProps<TProps, TOwnerState>(
  componentProps: TProps | ((ownerState: TOwnerState) => TProps) | undefined,
  ownerState: TOwnerState,
): TProps | undefined {
  if (typeof componentProps === 'function') {
    return (componentProps as (ownerState: TOwnerState) => TProps)(ownerState);
  }

  return componentProps;
}
