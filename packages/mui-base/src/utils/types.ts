import * as React from 'react';

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type WithOptionalOwnerState<T extends { ownerState: unknown }> = Omit<T, 'ownerState'> &
  Partial<Pick<T, 'ownerState'>>;

export type SlotComponentProps<TSlotComponent extends React.ElementType, TOverrides, TOwnerState> =
  | (Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides)
  | ((
      ownerState: TOwnerState,
    ) => Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides);
