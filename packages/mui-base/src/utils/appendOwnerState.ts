import isHostComponent from './isHostComponent';

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `ownerState` are not applied.
 * @param existingProps Props of the element.
 * @param ownerState
 */
export default function appendOwnerState<
  TExistingProps extends Record<string, any>,
  TOwnerState extends {},
>(
  elementType: React.ElementType,
  existingProps: TExistingProps = {} as TExistingProps,
  ownerState: TOwnerState,
): TExistingProps & { ownerState?: TOwnerState } {
  if (isHostComponent(elementType)) {
    return existingProps;
  }

  return {
    ...existingProps,
    ownerState: { ...existingProps.ownerState, ...ownerState },
  };
}
