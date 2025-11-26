import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import { renderHook, act } from '@testing-library/react';
import { useCarousel } from './useCarousel';

describe('useCarousel', () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
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

  const createChildren = (count: number) =>
    Array.from({ length: count }, (_, i) =>
      React.createElement('div', { key: i }, `Slide ${i + 1}`),
    );

  describe('basic state', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
        }),
      );

      expect(result.current.activeIndex).to.equal(0);
      expect(result.current.slideCount).to.equal(3);
      expect(result.current.direction).to.equal('forward');
      expect(result.current.dragging).to.equal(false);
    });

    it('should respect defaultActiveIndex', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(5),
          defaultActiveIndex: 2,
        }),
      );

      expect(result.current.activeIndex).to.equal(2);
    });

    it('should count valid children', () => {
      const children = [
        React.createElement('div', { key: 1 }),
        null,
        React.createElement('div', { key: 2 }),
        undefined,
        React.createElement('div', { key: 3 }),
      ];

      const { result } = renderHook(() =>
        useCarousel({
          children,
        }),
      );

      expect(result.current.slideCount).to.equal(3);
      expect(result.current.slides).to.have.length(3);
    });
  });

  describe('controlled mode', () => {
    it('should use activeIndex prop when provided', () => {
      const { result, rerender } = renderHook(
        ({ activeIndex }) =>
          useCarousel({
            children: createChildren(5),
            activeIndex,
          }),
        { initialProps: { activeIndex: 1 } },
      );

      expect(result.current.activeIndex).to.equal(1);

      rerender({ activeIndex: 3 });
      expect(result.current.activeIndex).to.equal(3);
    });
  });

  describe('navigation', () => {
    it('should navigate to next slide with goToNext', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(5),
          onChange,
        }),
      );

      act(() => {
        result.current.goToNext('navigation');
      });

      expect(result.current.activeIndex).to.equal(1);
      expect(result.current.direction).to.equal('forward');
      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(1);
      expect(onChange.firstCall.args[2]).to.equal('navigation');
    });

    it('should navigate to previous slide with goToPrevious', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(5),
          defaultActiveIndex: 2,
          onChange,
        }),
      );

      act(() => {
        result.current.goToPrevious('navigation');
      });

      expect(result.current.activeIndex).to.equal(1);
      expect(result.current.direction).to.equal('backward');
      expect(onChange.callCount).to.equal(1);
    });

    it('should navigate to specific slide with goToSlide', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(5),
          onChange,
        }),
      );

      act(() => {
        result.current.goToSlide(3, 'indicator');
      });

      expect(result.current.activeIndex).to.equal(3);
      expect(onChange.firstCall.args[2]).to.equal('indicator');
    });

    it('should not go below 0 without loop', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(5),
          onChange,
        }),
      );

      act(() => {
        result.current.goToPrevious('navigation');
      });

      expect(result.current.activeIndex).to.equal(0);
      expect(onChange.callCount).to.equal(0);
    });

    it('should not exceed max index without loop', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          defaultActiveIndex: 2,
          onChange,
        }),
      );

      act(() => {
        result.current.goToNext('navigation');
      });

      expect(result.current.activeIndex).to.equal(2);
      expect(onChange.callCount).to.equal(0);
    });

    it('should respect slidesPerView for max index', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(5),
          slidesPerView: 2,
          defaultActiveIndex: 3, // max should be 3 (5 - 2)
        }),
      );

      act(() => {
        result.current.goToNext('navigation');
      });

      // Should stay at 3 (max index)
      expect(result.current.activeIndex).to.equal(3);
    });
  });

  describe('loop mode', () => {
    it('should wrap from last to first with enableLoop', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          defaultActiveIndex: 2,
          enableLoop: true,
          onChange,
        }),
      );

      act(() => {
        result.current.goToNext('navigation');
      });

      expect(result.current.activeIndex).to.equal(0);
      expect(onChange.callCount).to.equal(1);
    });

    it('should wrap from first to last with enableLoop', () => {
      const onChange = spy();
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          enableLoop: true,
          onChange,
        }),
      );

      act(() => {
        result.current.goToPrevious('navigation');
      });

      expect(result.current.activeIndex).to.equal(2);
      expect(onChange.callCount).to.equal(1);
    });
  });

  describe('canGoPrevious and canGoNext', () => {
    it('should report correct navigation availability', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
        }),
      );

      // At index 0
      expect(result.current.canGoPrevious).to.equal(false);
      expect(result.current.canGoNext).to.equal(true);

      act(() => {
        result.current.goToSlide(1);
      });

      // At index 1
      expect(result.current.canGoPrevious).to.equal(true);
      expect(result.current.canGoNext).to.equal(true);

      act(() => {
        result.current.goToSlide(2);
      });

      // At index 2 (last)
      expect(result.current.canGoPrevious).to.equal(true);
      expect(result.current.canGoNext).to.equal(false);
    });

    it('should always allow navigation with enableLoop', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          enableLoop: true,
        }),
      );

      expect(result.current.canGoPrevious).to.equal(true);
      expect(result.current.canGoNext).to.equal(true);

      act(() => {
        result.current.goToSlide(2);
      });

      expect(result.current.canGoPrevious).to.equal(true);
      expect(result.current.canGoNext).to.equal(true);
    });
  });

  describe('auto-play state', () => {
    // Note: Timer-based auto-play tests are in the Carousel component tests
    // which use createRenderer's fake clock

    it('should not enable auto-play with single slide', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(1),
          autoPlay: true,
        }),
      );

      expect(result.current.isAutoPlaying).to.equal(false);
    });

    it('should enable auto-play with multiple slides', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          autoPlay: true,
        }),
      );

      expect(result.current.isAutoPlaying).to.equal(true);
    });
  });

  describe('dragging state', () => {
    it('should update dragging state via setDragging', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
        }),
      );

      expect(result.current.dragging).to.equal(false);

      act(() => {
        result.current.setDragging(true);
      });

      expect(result.current.dragging).to.equal(true);

      act(() => {
        result.current.setDragging(false);
      });

      expect(result.current.dragging).to.equal(false);
    });
  });

  describe('ownerState', () => {
    it('should include all relevant state in ownerState', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          autoPlay: true,
          enableLoop: true,
          slidesPerView: 2,
          spacing: 16,
          transition: 'fade',
          transitionDuration: 500,
        }),
      );

      const { ownerState } = result.current;
      expect(ownerState.activeIndex).to.equal(0);
      expect(ownerState.slideCount).to.equal(3);
      expect(ownerState.autoPlay).to.equal(true);
      expect(ownerState.enableLoop).to.equal(true);
      expect(ownerState.slidesPerView).to.equal(2);
      expect(ownerState.spacing).to.equal(16);
      expect(ownerState.transition).to.equal('fade');
      expect(ownerState.transitionDuration).to.equal(500);
    });
  });

  describe('auto-play handlers', () => {
    it('should return handlers for pause/resume', () => {
      const { result } = renderHook(() =>
        useCarousel({
          children: createChildren(3),
          autoPlay: true,
          autoPlayInterval: 3000,
        }),
      );

      expect(result.current.autoPlayHandlers).to.have.property('onMouseEnter');
      expect(result.current.autoPlayHandlers).to.have.property('onMouseLeave');
      expect(result.current.autoPlayHandlers).to.have.property('onFocus');
      expect(result.current.autoPlayHandlers).to.have.property('onBlur');
    });
  });
});
