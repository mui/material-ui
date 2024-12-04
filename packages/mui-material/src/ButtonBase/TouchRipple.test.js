import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer } from '@mui/internal-test-utils';
import TouchRipple, { DELAY_RIPPLE } from './TouchRipple';
import describeConformance from '../../test/describeConformance';

const cb = () => {};

describe('<TouchRipple />', () => {
  const { clock, render } = createRenderer();

  /**
   * @param {object} other props to spread to TouchRipple
   */
  function renderTouchRipple(other) {
    const touchRippleRef = React.createRef();
    const { container, unmount } = render(
      <TouchRipple
        ref={touchRippleRef}
        classes={{
          ripple: 'ripple',
          rippleVisible: 'ripple-visible',
          child: 'child',
          childLeaving: 'child-leaving',
        }}
        {...other}
      />,
    );

    return {
      instance: touchRippleRef.current,
      queryAllActiveRipples() {
        return container.querySelectorAll('.ripple-visible .child:not(.child-leaving)');
      },
      queryAllStoppingRipples() {
        return container.querySelectorAll('.ripple-visible .child-leaving');
      },
      queryRipple() {
        return container.querySelector('.ripple');
      },
      unmount,
    };
  }

  describeConformance(<TouchRipple />, () => ({
    classes: {},
    inheritComponent: 'span',
    render,
    refInstanceof: Object,
    muiName: 'MuiTouchRipple',
    skip: [
      'componentProp',
      'componentsProp',
      'refForwarding',
      'themeStyleOverrides',
      'themeVariants',
    ],
  }));

  describe('prop: center', () => {
    it('should compute the right ripple dimensions', () => {
      const { instance, queryRipple } = renderTouchRipple({ center: true });

      act(() => {
        instance.start(
          {},
          {
            fakeElement: true,
          },
          cb,
        );
      });

      expect(queryRipple()).toHaveInlineStyle({ height: '1px' });
      expect(queryRipple()).toHaveInlineStyle({ width: '1px' });
    });
  });

  it('should create individual ripples', () => {
    const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

    expect(queryAllActiveRipples()).to.have.lengthOf(0);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.start({ clientX: 0, clientY: 0 }, cb);
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.start({ clientX: 0, clientY: 0 }, cb);
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.start({ clientX: 0, clientY: 0 }, cb);
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(3);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(1);

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(2);

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(0);
    expect(queryAllStoppingRipples()).to.have.lengthOf(3);
  });

  describe('creating unique ripples', () => {
    it('should create a ripple', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      act(() => {
        instance.start(
          {},
          {
            pulsate: true,
            fakeElement: true,
          },
          cb,
        );
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should ignore a mousedown event after a touchstart event', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      act(() => {
        instance.start({ type: 'touchstart' }, cb);
        instance.start({ type: 'mousedown' }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should create a specific ripple', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples, queryRipple } =
        renderTouchRipple({
          center: true,
        });
      const clientX = 1;
      const clientY = 1;

      act(() => {
        instance.start({ clientX, clientY }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
      expect(queryRipple()).toHaveInlineStyle({ top: '-0.5px' });
      expect(queryRipple()).toHaveInlineStyle({ left: '-0.5px' });
    });
  });

  describe('mobile', () => {
    clock.withFakeTimers();

    it('should delay the display of the ripples', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      act(() => {
        instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE);

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE);
      act(() => {
        instance.stop({ type: 'touchend' }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    });

    it('should trigger the ripple for short touch interactions', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      act(() => {
        instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE / 2);

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      act(() => {
        instance.stop({ type: 'touchend' }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(1);

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    });

    it('should interrupt the ripple schedule', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE / 2);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.stop({ type: 'touchmove' });
      clock.tick(DELAY_RIPPLE);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should not leak on multi-touch', function multiTouchTest() {
      const { instance, unmount } = renderTouchRipple();

      instance.start({ type: 'touchstart', touches: [{}] }, () => {});
      instance.start({ type: 'touchstart', touches: [{}] }, () => {});
      unmount();

      // expect this to run gracefully without
      // "react state update on an unmounted component"
      clock.runAll();
    });

    it('should handle empty event.touches', () => {
      const { instance } = renderTouchRipple();

      expect(() => instance.start({ type: 'touchstart', touches: [] })).not.toErrorDev();
    });
  });
});
