import * as React from 'react';

export const reflow = (node: Element) => node.scrollTop;

interface ComponentProps {
  easing: string | { enter?: string; exit?: string };
  style: React.CSSProperties;
  timeout: number | { enter?: number; exit?: number };
}

interface Options {
  mode: 'enter' | 'exit';
}

interface TransitionProps {
  duration: number | undefined;
  easing: string | undefined;
  delay: string | undefined;
}

export function getTransitionProps(props: ComponentProps, options: Options): TransitionProps {
  const { timeout, easing, style = {} } = props;

  return {
    // TODO: `transitionDuration` implies `timeout: number` but we warn at no point if a user breaks these assumptions
    // @ts-expect-error
    duration:
      style.transitionDuration || typeof timeout === 'number'
        ? timeout
        : timeout[options.mode] || 0,
    easing:
      style.transitionTimingFunction || typeof easing === 'object'
        ? // TODO: Looks odd that we want `undefined` for `transitionTimingFunction` && `easing: string`.
          // But defined for `transitionTimingFunction` && `easing: object`.
          // I was under the impression that `easing: string` was a shorthand for `easing: { enter: string, exit: string }`
          // Though maybe this code just assumes that `transitionTimingFunction` implies that `easing: object`.
          // @ts-expect-error
          (easing[options.mode] as string | undefined)
        : easing,
    delay: style.transitionDelay,
  };
}
