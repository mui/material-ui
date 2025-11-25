/**
 * Force browser reflow to trigger CSS transitions
 */
export function reflow(node: HTMLElement): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.scrollTop;
}

/**
 * Check if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Get effective transition duration (0 if reduced motion preferred)
 */
export function getEffectiveDuration(duration: number): number {
  return shouldReduceMotion() ? 0 : duration;
}
