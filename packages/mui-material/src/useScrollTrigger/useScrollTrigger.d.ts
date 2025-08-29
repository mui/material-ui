export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Node | Window | null;
  threshold?: number;
  /**
   * If `false`, the scroll trigger logic will not be locked after a state change.
   * If `true`, there will be a lock period after state changes to prevent
   * feedback loops during animations (e.g., Collapse in sticky AppBar).
   * @default false
   */
  enableReentrantLock?: boolean;
  /**
   * Duration in milliseconds for the reentrant lock.
   * This should match the Collapse's transition timing.
   * Only applies when `enableReentrantLock` is `true`.
   * @default 300
   */
  reentrantLockDuration?: number;
}

export default function useScrollTrigger(options?: UseScrollTriggerOptions): boolean;
