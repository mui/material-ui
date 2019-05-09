export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Node | Window;
  threshold?: number;
}

export default function useScrollTrigger(options?: UseScrollTriggerOptions): boolean;
