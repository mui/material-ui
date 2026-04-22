export interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}
export const easing: Easing;

export type ReducedMotionMode = 'never' | 'system' | 'always';

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

export interface TransitionsOptions {
  reducedMotion?: ReducedMotionMode | undefined;
  easing?: Partial<Easing> | undefined;
  duration?: Partial<Duration> | undefined;
  create?:
    | ((
        props: string | string[],
        options?: Partial<{ duration: number | string; easing: string; delay: number | string }>,
      ) => string)
    | undefined;
  getAutoHeightDuration?: ((height: number) => number) | undefined;
}

/**
 * @internal
 * @param props
 * @param options
 */
export function create(
  props: string | string[],
  options?: Partial<{ duration: number | string; easing: string; delay: number | string }>,
): string;

/**
 * @internal
 * @param height
 */
export function getAutoHeightDuration(height: number): number;

export interface Transitions {
  reducedMotion: ReducedMotionMode;
  easing: Easing;
  duration: Duration;
  create: typeof create;
  getAutoHeightDuration: typeof getAutoHeightDuration;
}

export default function createTransitions(inputTransitions: TransitionsOptions): Transitions;
