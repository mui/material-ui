export type MuiCancellableEvent = {
  defaultMuiPrevented?: boolean;
};

export type MuiCancellableEventHandler<Event> = (event: Event & MuiCancellableEvent) => void;
