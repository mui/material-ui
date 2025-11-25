import { expect } from 'chai';
import * as React from 'react';
import { spy, SinonSpy } from 'sinon';
import { renderHook, act } from '@testing-library/react';
import { useKeyboard } from './useKeyboard';

describe('useKeyboard', () => {
  const createKeyboardEvent = (
    key: string,
    modifiers: Partial<{
      ctrlKey: boolean;
      altKey: boolean;
      metaKey: boolean;
      shiftKey: boolean;
    }> = {},
  ): React.KeyboardEvent => {
    return {
      key,
      ctrlKey: modifiers.ctrlKey ?? false,
      altKey: modifiers.altKey ?? false,
      metaKey: modifiers.metaKey ?? false,
      shiftKey: modifiers.shiftKey ?? false,
      preventDefault: spy(),
    } as unknown as React.KeyboardEvent;
  };

  const createDefaultParams = () => ({
    onNext: spy(),
    onPrevious: spy(),
    onFirst: spy(),
    onLast: spy(),
    onPause: spy(),
    onGoToSlide: spy(),
    slideCount: 5,
  });

  describe('arrow key navigation (LTR)', () => {
    it('should call onNext for ArrowRight', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(1);
      expect((event.preventDefault as SinonSpy).callCount).to.equal(1);
    });

    it('should call onPrevious for ArrowLeft', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowLeft');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onPrevious.callCount).to.equal(1);
    });
  });

  describe('arrow key navigation (RTL)', () => {
    it('should call onPrevious for ArrowRight in RTL', () => {
      const params = { ...createDefaultParams(), rtl: true };
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onPrevious.callCount).to.equal(1);
    });

    it('should call onNext for ArrowLeft in RTL', () => {
      const params = { ...createDefaultParams(), rtl: true };
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowLeft');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(1);
    });
  });

  describe('Home and End keys', () => {
    it('should call onFirst for Home key', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('Home');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onFirst.callCount).to.equal(1);
    });

    it('should call onLast for End key', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('End');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onLast.callCount).to.equal(1);
    });
  });

  describe('Escape key', () => {
    it('should call onPause for Escape key', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('Escape');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onPause.callCount).to.equal(1);
    });
  });

  describe('number key navigation', () => {
    it('should call onGoToSlide with correct index for number keys', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('3');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onGoToSlide.callCount).to.equal(1);
      expect(params.onGoToSlide.firstCall.args[0]).to.equal(2); // '3' -> index 2
    });

    it('should not call onGoToSlide for number keys beyond slide count', () => {
      const params = { ...createDefaultParams(), slideCount: 3 };
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('9');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onGoToSlide.callCount).to.equal(0);
    });
  });

  describe('modifier keys', () => {
    it('should not navigate when Ctrl is pressed', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight', { ctrlKey: true });
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(0);
      expect((event.preventDefault as SinonSpy).callCount).to.equal(0);
    });

    it('should not navigate when Alt is pressed', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight', { altKey: true });
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(0);
    });

    it('should not navigate when Meta is pressed', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight', { metaKey: true });
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(0);
    });

    it('should not navigate when Shift is pressed', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight', { shiftKey: true });
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(0);
    });
  });

  describe('disabled state', () => {
    it('should not handle keys when disabled', () => {
      const params = { ...createDefaultParams(), disabled: true };
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('ArrowRight');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(0);
      expect((event.preventDefault as SinonSpy).callCount).to.equal(0);
    });
  });

  describe('unhandled keys', () => {
    it('should not call any callback for unhandled keys', () => {
      const params = createDefaultParams();
      const { result } = renderHook(() => useKeyboard(params));

      const event = createKeyboardEvent('Enter');
      act(() => {
        result.current.handlers.onKeyDown(event);
      });

      expect(params.onNext.callCount).to.equal(0);
      expect(params.onPrevious.callCount).to.equal(0);
      expect(params.onFirst.callCount).to.equal(0);
      expect(params.onLast.callCount).to.equal(0);
      expect(params.onPause.callCount).to.equal(0);
      expect(params.onGoToSlide.callCount).to.equal(0);
      expect((event.preventDefault as SinonSpy).callCount).to.equal(0);
    });
  });
});
