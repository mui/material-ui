import { SxProps } from '@mui/system';

export type SlotComponentProps<TSlotComponent extends React.ElementType, TOverrides, TOwnerState> =
  | (Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides)
  | ((
      ownerState: TOwnerState,
    ) => Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides);

export type SlotComponentPropsWithSlotState<
  TSlotComponent extends React.ElementType,
  TOverrides,
  TOwnerState,
  TSlotState,
> =
  | (Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides)
  | ((
      ownerState: TOwnerState,
      slotState: TSlotState,
    ) => Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides);

export type SlotCommonProps = {
  component?: React.ElementType;
  sx?: SxProps;
};

export type SlotProps<
  TSlotComponent extends React.ElementType,
  TOverrides,
  TOwnerState,
> = SlotComponentProps<TSlotComponent, SlotCommonProps & TOverrides, TOwnerState>;

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

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type WithOptionalOwnerState<Props extends { ownerState: unknown }> = Omit<
  Props,
  'ownerState'
> &
  Partial<Pick<Props, 'ownerState'>>;
