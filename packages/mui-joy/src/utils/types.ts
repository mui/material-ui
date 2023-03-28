import { SxProps } from '../styles/types';

export type SlotCommonProps = {
  component?: React.ElementType;
  sx?: SxProps;
};

export type SlotProps<TSlotComponent extends React.ElementType, TOverrides, TOwnerState> =
  // omit `color` from HTML attributes because it conflicts with Joy UI `color` prop.
  | (Omit<React.ComponentPropsWithRef<TSlotComponent>, 'color'> &
      TOverrides &
      SlotCommonProps &
      Record<string, unknown>)
  | ((
      ownerState: TOwnerState,
    ) => Omit<React.ComponentPropsWithRef<TSlotComponent>, 'color'> &
      TOverrides &
      SlotCommonProps &
      Record<string, unknown>);

/**
 * Use the keys of `Slots` to make sure that K contains all of the keys
 *
 * @example CreateSlotsAndSlotProps<{ root: React.ElementType, decorator: React.ElementType }, { root: ..., decorator: ... }>
 */
export type CreateSlotsAndSlotProps<Slots, K extends Record<keyof Slots, any>> = {
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: Slots;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: {
    [P in keyof K]?: K[P];
  };
};
