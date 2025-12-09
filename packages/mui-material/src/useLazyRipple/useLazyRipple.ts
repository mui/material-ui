'use client';
import * as React from 'react';
import useLazyRef from '@mui/utils/useLazyRef';
import { TouchRippleActions } from '../ButtonBase/TouchRipple';

const EMPTY_ARRAY = [] as const;

type ControlledPromise<T = unknown> = Promise<T> & {
  resolve: Function;
  reject: Function;
};

/**
 * Lazy initialization container for the Ripple instance. This improves
 * performance by delaying mounting the ripple until it's needed.
 */
export class LazyRipple {
  /** React ref to the ripple instance */
  ref: React.RefObject<TouchRippleActions | null>;

  /** If the ripple component should be mounted */
  shouldMount: boolean;

  /** Promise that resolves when the ripple component is mounted */
  private mounted: ControlledPromise | null;

  /** If the ripple component has been mounted */
  private didMount: boolean;

  /** React state hook setter */
  private setShouldMount: React.Dispatch<boolean> | null;

  static create() {
    return new LazyRipple();
  }

  static use() {
    /* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
    const ripple = useLazyRef(LazyRipple.create).current;
    const [shouldMount, setShouldMount] = React.useState(false);

    ripple.shouldMount = shouldMount;
    ripple.setShouldMount = setShouldMount;

    React.useEffect(ripple.mountEffect, [shouldMount]);
    React.useEffect(ripple.unmountEffect, EMPTY_ARRAY);
    /* eslint-enable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */

    return ripple;
  }

  constructor() {
    this.ref = { current: null };
    this.mounted = null;
    this.didMount = false;
    this.shouldMount = false;
    this.setShouldMount = null;
  }

  mount() {
    if (!this.mounted) {
      this.mounted = createControlledPromise();
      this.shouldMount = true;
      this.setShouldMount!(this.shouldMount);
    }
    return this.mounted;
  }

  mountEffect = () => {
    if (this.shouldMount && !this.didMount) {
      if (this.ref.current !== null) {
        this.didMount = true;
        this.mounted!.resolve();
      }
    }
  };

  unmountEffect = () => () => {
    this.ref.current = null;
  };

  /* Ripple API */

  start(...args: Parameters<TouchRippleActions['start']>) {
    this.mount().then(() => this.ref.current?.start(...args));
  }

  stop(...args: Parameters<TouchRippleActions['stop']>) {
    this.mount().then(() => this.ref.current?.stop(...args));
  }

  pulsate(...args: Parameters<TouchRippleActions['pulsate']>) {
    this.mount().then(() => this.ref.current?.pulsate(...args));
  }
}

export default function useLazyRipple() {
  return LazyRipple.use();
}

function createControlledPromise(): ControlledPromise {
  let resolve: Function;
  let reject: Function;

  const p = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  }) as ControlledPromise;
  p.resolve = resolve!;
  p.reject = reject!;

  return p;
}
