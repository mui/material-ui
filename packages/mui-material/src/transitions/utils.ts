import * as React from 'react';

export const reflow = (node: Element) => node.scrollTop;

interface ComponentProps {
  easing: string | { enter?: string; exit?: string } | undefined;
  style: React.CSSProperties | undefined;
  timeout: number | { enter?: number; exit?: number };
}

interface Options {
  mode: 'enter' | 'exit';
}

interface TransitionProps {
  duration: string | number;
  easing: string | undefined;
  delay: string | undefined;
}

export function getTransitionProps(props: ComponentProps, options: Options): TransitionProps {
  const { timeout, easing, style = {} } = props;

  return {
    duration:
      style.transitionDuration ??
      (typeof timeout === 'number' ? timeout : timeout[options.mode] || 0),
    easing:
      style.transitionTimingFunction ??
      (typeof easing === 'object' ? easing[options.mode] : easing),
    delay: style.transitionDelay,
  };
}
