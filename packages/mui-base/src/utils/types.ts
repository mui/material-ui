import * as React from 'react';

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type WithOptionalOwnerState<Props extends { ownerState: unknown }> = Omit<
  Props,
  'ownerState'
> &
  Partial<Pick<Props, 'ownerState'>>;

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
