import * as React from 'react';

export const reflow = (node: Element) => node.scrollTop;

interface ComponentProps {
  easing: string | { enter?: string | undefined; exit?: string | undefined } | undefined;
  style: React.CSSProperties | undefined;
  timeout: number | { enter?: number | undefined; exit?: number | undefined };
}

interface Options {
  mode: 'enter' | 'exit';
}

interface TransitionProps {
  duration: string | number;
  easing: string | undefined;
  delay: string | undefined;
}

export function normalizedTransitionCallback(
  nodeRef: React.RefObject<HTMLElement | null>,
  callback: ((node: HTMLElement, isAppearing?: boolean) => void) | undefined,
): (maybeIsAppearing?: boolean) => void {
  return (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current!;
      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
}

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * Computes the child style for a transition component, reusing existing
 * references when possible to preserve referential equality for React.memo.
 */
export function getTransitionChildStyle(
  state: TransitionState,
  inProp: boolean | undefined,
  baseStyles: Record<string, React.CSSProperties>,
  hiddenStyles: React.CSSProperties,
  styleProp: React.CSSProperties | undefined,
  childStyle: React.CSSProperties | undefined,
): React.CSSProperties | undefined {
  const base =
    state === 'exited' && !inProp ? hiddenStyles : baseStyles[state] || baseStyles.exited;
  return styleProp || childStyle ? { ...base, ...styleProp, ...childStyle } : base;
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
