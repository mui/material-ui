export interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}
export const easing: Easing;

export interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}
export const duration: Duration;

export function formatMs(milliseconds: number): string;

export interface Transitions {
  easing: Easing;
  duration: Duration;
  create(
    props: string | string[],
    options?: Partial<{ duration: number; easing: string; delay: number }>
  ): string;
  getAutoHeightDuration(height: number): number;
}

export default Transitions;
