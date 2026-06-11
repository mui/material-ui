import * as React from 'react';
import { WithDataAttributes } from './DataAttributes';

export * from './DataAttributes';

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type WithOptionalOwnerState<Props extends { ownerState: unknown }> = Omit<
  Props,
  'ownerState'
> &
  Partial<Pick<Props, 'ownerState'>>;

export type SlotComponentProps<TSlotComponent extends React.ElementType, TOverrides, TOwnerState> =
  | WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>
  | ((
      ownerState: TOwnerState,
    ) => WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>);

export type SlotComponentPropsWithSlotState<
  TSlotComponent extends React.ElementType,
  TOverrides,
  TOwnerState,
  TSlotState,
> =
  | WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>
  | ((
      ownerState: TOwnerState,
      slotState: TSlotState,
    ) => WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>);
