import { expect } from 'chai';
import * as React from 'react';
import { spy, SinonSpy } from 'sinon';
import { renderHook, act } from '@testing-library/react';
import { useSwipe } from './useSwipe';

describe('useSwipe', () => {
  const createPointerEvent = (
    type: 'down' | 'move' | 'up' | 'cancel',
    options: {
      pointerId?: number;
      clientX?: number;
      clientY?: number;
      button?: number;
      pointerType?: string;
    } = {},
  ): React.PointerEvent => {
    const currentTarget = {
      setPointerCapture: spy(),
      releasePointerCapture: spy(),
    };

    return {
      pointerId: options.pointerId ?? 1,
      clientX: options.clientX ?? 0,
      clientY: options.clientY ?? 0,
      button: options.button ?? 0,
      pointerType: options.pointerType ?? 'mouse',
      currentTarget,
      target: document.createElement('div'),
      preventDefault: spy(),
    } as unknown as React.PointerEvent;
  };

  it('should return initial state with swiping false', () => {
    const { result } = renderHook(() => useSwipe({}));

    expect(result.current.swiping).to.equal(false);
    expect(result.current.swipeOffset).to.equal(0);
  });

  it('should set swiping to true on pointer down', () => {
    const { result } = renderHook(() => useSwipe({}));

    const downEvent = createPointerEvent('down', { clientX: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    expect(result.current.swiping).to.equal(true);
    expect(
      (downEvent.currentTarget as unknown as { setPointerCapture: SinonSpy }).setPointerCapture
        .callCount,
    ).to.equal(1);
  });

  it('should call onSwipeLeft for left swipe', () => {
    const onSwipeLeft = spy();
    const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

    // Start at x=200
    const downEvent = createPointerEvent('down', { clientX: 200, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    // Move to x=100 (leftward, -100 distance)
    const moveEvent = createPointerEvent('move', { clientX: 100, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerMove(moveEvent);
    });

    // Complete swipe
    const upEvent = createPointerEvent('up', { clientX: 100, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerUp(upEvent);
    });

    expect(onSwipeLeft.callCount).to.equal(1);
  });

  it('should call onSwipeRight for right swipe', () => {
    const onSwipeRight = spy();
    const { result } = renderHook(() => useSwipe({ onSwipeRight }));

    // Start at x=100
    const downEvent = createPointerEvent('down', { clientX: 100, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    // Move to x=200 (rightward, +100 distance)
    const moveEvent = createPointerEvent('move', { clientX: 200, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerMove(moveEvent);
    });

    // Complete swipe
    const upEvent = createPointerEvent('up', { clientX: 200, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerUp(upEvent);
    });

    expect(onSwipeRight.callCount).to.equal(1);
  });

  it('should not trigger swipe for short distance', () => {
    const onSwipeLeft = spy();
    const onSwipeRight = spy();
    // Use very high velocityThreshold to test distance threshold only
    // (tests run synchronously so velocity would be artificially high)
    const { result } = renderHook(() =>
      useSwipe({ onSwipeLeft, onSwipeRight, threshold: 50, velocityThreshold: 1000 }),
    );

    const downEvent = createPointerEvent('down', { clientX: 100, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    // Move only 20px (less than threshold)
    const moveEvent = createPointerEvent('move', { clientX: 120, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerMove(moveEvent);
    });

    const upEvent = createPointerEvent('up', { clientX: 120, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerUp(upEvent);
    });

    expect(onSwipeLeft.callCount).to.equal(0);
    expect(onSwipeRight.callCount).to.equal(0);
  });

  it('should not capture events when disabled', () => {
    const onSwipeLeft = spy();
    const { result } = renderHook(() => useSwipe({ onSwipeLeft, disabled: true }));

    const downEvent = createPointerEvent('down', { clientX: 200 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    expect(result.current.swiping).to.equal(false);
    expect(
      (downEvent.currentTarget as unknown as { setPointerCapture: SinonSpy }).setPointerCapture
        .callCount,
    ).to.equal(0);
  });

  it('should reset state on pointer cancel', () => {
    const { result } = renderHook(() => useSwipe({}));

    const downEvent = createPointerEvent('down', { clientX: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    expect(result.current.swiping).to.equal(true);

    const cancelEvent = createPointerEvent('cancel');
    act(() => {
      result.current.handlers.onPointerCancel(cancelEvent);
    });

    expect(result.current.swiping).to.equal(false);
    expect(result.current.swipeOffset).to.equal(0);
  });

  it('should update swipeOffset during horizontal drag', () => {
    const { result } = renderHook(() => useSwipe({}));

    const downEvent = createPointerEvent('down', { clientX: 100, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    // Move horizontally
    const moveEvent = createPointerEvent('move', { clientX: 150, clientY: 105 });
    act(() => {
      result.current.handlers.onPointerMove(moveEvent);
    });

    expect(result.current.swipeOffset).to.equal(50);
  });

  it('should reset state for vertical gesture', () => {
    const { result } = renderHook(() => useSwipe({}));

    const downEvent = createPointerEvent('down', { clientX: 100, clientY: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    // Move vertically (more Y than X movement)
    const moveEvent = createPointerEvent('move', { clientX: 105, clientY: 150 });
    act(() => {
      result.current.handlers.onPointerMove(moveEvent);
    });

    expect(result.current.swiping).to.equal(false);
  });

  it('should not capture non-primary mouse button', () => {
    const { result } = renderHook(() => useSwipe({}));

    // Right-click (button 2)
    const downEvent = createPointerEvent('down', { button: 2, pointerType: 'mouse' });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    expect(result.current.swiping).to.equal(false);
  });

  it('should ignore pointer moves from different pointer id', () => {
    const { result } = renderHook(() => useSwipe({}));

    const downEvent = createPointerEvent('down', { pointerId: 1, clientX: 100 });
    act(() => {
      result.current.handlers.onPointerDown(downEvent);
    });

    // Move from different pointer
    const moveEvent = createPointerEvent('move', { pointerId: 2, clientX: 200 });
    act(() => {
      result.current.handlers.onPointerMove(moveEvent);
    });

    // Should not update offset
    expect(result.current.swipeOffset).to.equal(0);
  });
});
