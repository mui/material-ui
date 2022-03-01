export type EventHandlers = Record<string, React.EventHandler<any>>;

export type WithOptionalOwnerState<T extends { ownerState: unknown }> = Omit<T, 'ownerState'> &
  Partial<Pick<T, 'ownerState'>>;
