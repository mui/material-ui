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

interface TranslateOffset {
  offsetX: number;
  offsetY: number;
}

const DEFAULT_TRANSLATE_OFFSET = { offsetX: 0, offsetY: 0 };

const transformOffsetIndexes: Record<string, readonly [number | null, number | null]> = {
  matrix: [4, 5],
  matrix3d: [12, 13],
  translate: [0, 1],
  translate3d: [0, 1],
  translateX: [0, null],
  translateY: [null, 0],
};

function parseTranslateValue(value: string | undefined): number {
  const parsedValue = parseFloat(value ?? '');
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

function parseTransform(transform: string): { type: string; values: number[] } | null {
  const match = transform.match(
    /^(matrix|matrix3d|translate|translate3d|translateX|translateY)\((.+)\)$/,
  );

  if (!match) {
    return null;
  }

  return {
    type: match[1],
    values: match[2].split(',').map(parseTranslateValue),
  };
}

function getTranslateOffsetValue(values: number[], index: number | null): number {
  return index === null ? 0 : values[index] || 0;
}

/**
 * Extracts the x/y translation from a CSS transform string.
 *
 * Transition components use these offsets when calculating off-screen positions:
 * if an element is already translated, the distance needed to hide it must start
 * from that visual position instead of its untransformed layout position.
 *
 * CSSOM commonly serializes translations as matrix() or matrix3d(), while inline
 * gesture styles may use translate(), translate3d(), translateX(), or
 * translateY(). This helper normalizes those supported forms into numeric pixel
 * offsets and returns zero offsets for empty, none, or unsupported transforms.
 */
export function getTranslateOffsets(transform: string | undefined): TranslateOffset {
  if (!transform || transform === 'none') {
    return DEFAULT_TRANSLATE_OFFSET;
  }

  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return DEFAULT_TRANSLATE_OFFSET;
  }

  const { type, values } = parsedTransform;
  const offsetIndexes = transformOffsetIndexes[type];

  if (!offsetIndexes) {
    return DEFAULT_TRANSLATE_OFFSET;
  }

  return {
    offsetX: getTranslateOffsetValue(values, offsetIndexes[0]),
    offsetY: getTranslateOffsetValue(values, offsetIndexes[1]),
  };
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
