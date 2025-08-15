export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Node | Window | null;
  threshold?: number;
  /**
   * If `true`, the scroll trigger logic will not be locked after a state change.
   * If `false`, there will be a lock period after state changes to prevent
   * feedback loops during animations (e.g., Collapse in sticky AppBar).
   * @default true
   */
  disableReentrant?: boolean;
  /**
   * Duration in milliseconds for the reentrant lock.
   * Only applies when `disableReentrant` is `false`.
   * @default 300
   */
  reentrantLockDuration?: number;
}

export default function useScrollTrigger(options?: UseScrollTriggerOptions): boolean;
