export default function useEventCallback<Args extends unknown[]>(
  func: (...args: Args) => void
): (...args: Args) => void;
