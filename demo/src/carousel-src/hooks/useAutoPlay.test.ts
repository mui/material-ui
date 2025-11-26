import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import { renderHook, act } from '@testing-library/react';
import { useAutoPlay } from './useAutoPlay';

describe('useAutoPlay', () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    // Default to no reduced motion preference
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  // Note: Timer-based tests are in the Carousel component tests
  // which use createRenderer's fake clock

  it('should return isPlaying as true when enabled and not paused', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
      }),
    );

    expect(result.current.isPlaying).to.equal(true);
  });

  it('should return isPlaying as false when disabled', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: false,
        interval: 3000,
        onTick,
      }),
    );

    expect(result.current.isPlaying).to.equal(false);
  });

  it('should pause and resume with manual controls', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
      }),
    );

    expect(result.current.isPlaying).to.equal(true);

    act(() => {
      result.current.pause();
    });
    expect(result.current.isPlaying).to.equal(false);

    act(() => {
      result.current.resume();
    });
    expect(result.current.isPlaying).to.equal(true);
  });

  it('should provide mouse enter/leave handlers that pause/resume', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
        pauseOnHover: true,
      }),
    );

    expect(result.current.isPlaying).to.equal(true);

    act(() => {
      result.current.handlers.onMouseEnter();
    });
    expect(result.current.isPlaying).to.equal(false);

    act(() => {
      result.current.handlers.onMouseLeave();
    });
    expect(result.current.isPlaying).to.equal(true);
  });

  it('should provide focus/blur handlers that pause/resume', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
        pauseOnFocus: true,
      }),
    );

    expect(result.current.isPlaying).to.equal(true);

    act(() => {
      result.current.handlers.onFocus();
    });
    expect(result.current.isPlaying).to.equal(false);

    act(() => {
      result.current.handlers.onBlur();
    });
    expect(result.current.isPlaying).to.equal(true);
  });

  it('should not pause on hover when pauseOnHover is false', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
        pauseOnHover: false,
      }),
    );

    act(() => {
      result.current.handlers.onMouseEnter();
    });
    // Should still be playing since pauseOnHover is false
    expect(result.current.isPlaying).to.equal(true);
  });

  it('should disable auto-play when reduced motion is preferred', () => {
    window.matchMedia = (query: string) =>
      ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;

    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
      }),
    );

    expect(result.current.isPlaying).to.equal(false);
  });

  it('should return all required handler functions', () => {
    const onTick = spy();
    const { result } = renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 3000,
        onTick,
      }),
    );

    expect(result.current.handlers.onMouseEnter).to.be.a('function');
    expect(result.current.handlers.onMouseLeave).to.be.a('function');
    expect(result.current.handlers.onFocus).to.be.a('function');
    expect(result.current.handlers.onBlur).to.be.a('function');
    expect(result.current.pause).to.be.a('function');
    expect(result.current.resume).to.be.a('function');
  });
});
