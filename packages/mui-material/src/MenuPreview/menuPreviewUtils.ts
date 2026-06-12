import clsx from 'clsx';

export type StateClassName<State> = string | ((state: State) => string | undefined) | undefined;

export function resolveStateClassName<State>(
  className: StateClassName<State>,
  state: State,
): string | undefined {
  return typeof className === 'function' ? className(state) : className;
}

export function mergeStateClassName<State>(
  className: StateClassName<State>,
  getClassName: (state: State) => string | undefined,
) {
  return (state: State) => clsx(getClassName(state), resolveStateClassName(className, state));
}

export type SlotProps<SlotPropsValue, OwnerState> =
  | SlotPropsValue
  | ((ownerState: OwnerState) => SlotPropsValue)
  | undefined;

export function resolveSlotProps<SlotPropsValue, OwnerState>(
  slotProps: SlotProps<SlotPropsValue, OwnerState>,
  ownerState: OwnerState,
): SlotPropsValue | undefined {
  return typeof slotProps === 'function'
    ? (slotProps as (ownerState: OwnerState) => SlotPropsValue)(ownerState)
    : slotProps;
}
