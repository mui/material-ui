type MuiCancellableEvent = {
  defaultMuiPrevented?: boolean;
};

export default MuiCancellableEvent;

export type MuiCancellableEventHandler<Event> = (event: Event & MuiCancellableEvent) => void;
