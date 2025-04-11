export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Node | Window | null;
  threshold?: number;
}

export default function useScrollTrigger(options?: UseScrollTriggerOptions): boolean;
