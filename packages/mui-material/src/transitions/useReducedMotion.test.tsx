import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import type { ReducedMotionMode } from '../styles/createTransitions';
import useReducedMotion from './useReducedMotion';

describe('useReducedMotion', () => {
  const { render } = createRenderer();
  let originalMatchMedia: typeof window.matchMedia;
  let addEventListenerCount = 0;
  let removeEventListenerCount = 0;
  let listeners: Array<() => void> = [];
  let instance: MediaQueryList;

  function installMatchMedia(matches: boolean) {
    listeners = [];
    addEventListenerCount = 0;
    removeEventListenerCount = 0;
    instance = {
      matches,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: (_eventType: string, listener: EventListenerOrEventListenerObject) => {
        addEventListenerCount += 1;
        listeners.push(listener as () => void);
      },
      removeEventListener: (_eventType: string, listener: EventListenerOrEventListenerObject) => {
        removeEventListenerCount += 1;
        listeners = listeners.filter((item) => item !== listener);
      },
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => true,
    };

    window.matchMedia = () => instance;
  }

  function Test(props: { mode: ReducedMotionMode; disablePrefersReducedMotion?: boolean }) {
    const reducedMotion = useReducedMotion(props.mode, props.disablePrefersReducedMotion);
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: 250,
      delay: '20ms',
    });

    return (
      <span
        data-testid="result"
        data-delay={transitionTiming.delay}
        data-duration={transitionTiming.duration}
        data-should-reduce={reducedMotion.shouldReduceMotion}
      />
    );
  }

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('does not subscribe to matchMedia when mode is never', () => {
    installMatchMedia(true);

    const { unmount } = render(<Test mode="never" />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '250');
    expect(addEventListenerCount).to.equal(0);

    unmount();
    expect(removeEventListenerCount).to.equal(0);
  });

  it('does not subscribe to matchMedia when mode is always', () => {
    installMatchMedia(false);

    const { unmount } = render(<Test mode="always" />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'true');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '0');
    expect(screen.getByTestId('result')).to.have.attribute('data-delay', '0ms');
    expect(addEventListenerCount).to.equal(0);

    unmount();
    expect(removeEventListenerCount).to.equal(0);
  });

  it('subscribes and unsubscribes only when mode is system', () => {
    installMatchMedia(false);

    const { unmount } = render(<Test mode="system" />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
    expect(addEventListenerCount).to.be.greaterThan(0);

    unmount();
    expect(removeEventListenerCount).to.equal(addEventListenerCount);
  });

  it('reacts to media query changes in system mode', () => {
    installMatchMedia(false);

    render(<Test mode="system" />);
    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');

    act(() => {
      Object.defineProperty(instance, 'matches', {
        configurable: true,
        value: true,
      });
      listeners.forEach((listener) => {
        listener();
      });
    });

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'true');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '0');
    expect(screen.getByTestId('result')).to.have.attribute('data-delay', '0ms');
  });

  it('allows per-instance opt-out', () => {
    installMatchMedia(false);

    render(<Test mode="always" disablePrefersReducedMotion />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '250');
    expect(screen.getByTestId('result')).to.have.attribute('data-delay', '20ms');
  });
});
