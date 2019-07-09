import React from 'react';
import { useFakeTimers } from 'sinon';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import TouchRipple, { DELAY_RIPPLE } from './TouchRipple';

const cb = () => {};

describe('<TouchRipple />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: true });

  /**
   * @param {HTMLElement} container returned by render
   * @param {number} active of active ripples to check for
   * @param {number} stopping of stopping ripples to check for
   */
  function checkRipples(container, active, stopping) {
    expect(
      container.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
    ).to.have.lengthOf(active);
    expect(container.querySelectorAll('.ripple-visible .child-leaving')).to.have.length(stopping);
  }

  /**
   * @param {object} other props to spread to TouchRipple
   */
  function createTouchRipple(other) {
    const touchRippleRef = React.createRef();
    const { container } = render(
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

    const instance = touchRippleRef.current;
    return { container, instance };
  }

  before(() => {
    classes = getClasses(<TouchRipple />);
    mount = createMount({ strict: true });
  });

  after(() => {
    cleanup();
    mount.cleanUp();
  });

  describeConformance(<TouchRipple />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: Object,
    skip: ['componentProp'],
  }));

  describe('prop: center', () => {
    it('should should compute the right ripple dimensions', () => {
      const { instance, container } = createTouchRipple({ center: true });

      instance.start(
        {},
        {
          fakeElement: true,
        },
        cb,
      );
      expect(container.querySelector('.ripple').style).to.have.property('height', '1px');
      expect(container.querySelector('.ripple').style).to.have.property('width', '1px');
    });
  });

  it('should create individual ripples', () => {
    const { instance, container } = createTouchRipple();

    checkRipples(container, 0, 0);

    instance.start({ clientX: 0, clientY: 0 }, cb);
    checkRipples(container, 1, 0);

    instance.start({ clientX: 0, clientY: 0 }, cb);
    checkRipples(container, 2, 0);

    instance.start({ clientX: 0, clientY: 0 }, cb);
    checkRipples(container, 3, 0);

    instance.stop({ type: 'mouseup' });
    checkRipples(container, 2, 1);

    instance.stop({ type: 'mouseup' });
    checkRipples(container, 1, 2);

    instance.stop({ type: 'mouseup' });
    checkRipples(container, 0, 3);
  });

  describe('creating unique ripples', () => {
    it('should create a ripple', () => {
      const { instance, container } = createTouchRipple();

      instance.start(
        {},
        {
          pulsate: true,
          fakeElement: true,
        },
        cb,
      );
      checkRipples(container, 1, 0);
    });

    it('should ignore a mousedown event after a touchstart event', () => {
      const { instance, container } = createTouchRipple();

      instance.start({ type: 'touchstart' }, cb);
      instance.start({ type: 'mousedown' }, cb);
      checkRipples(container, 1, 0);
    });

    it('should create a specific ripple', () => {
      const { instance, container } = createTouchRipple({ center: true });
      const clientX = 1;
      const clientY = 1;
      instance.start({ clientX, clientY }, { fakeElement: true }, cb);
      checkRipples(container, 1, 0);
      expect(container.querySelector('.ripple').style).to.have.property('top', '-0.5px');
      expect(container.querySelector('.ripple').style).to.have.property('left', '-0.5px');
    });
  });

  describe('mobile', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should delay the display of the ripples', () => {
      const { instance, container } = createTouchRipple();

      checkRipples(container, 0, 0);
      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      checkRipples(container, 0, 0);

      clock.tick(DELAY_RIPPLE);
      checkRipples(container, 1, 0);

      clock.tick(DELAY_RIPPLE);
      instance.stop({ type: 'touchend' }, cb);
      checkRipples(container, 0, 1);
    });

    it('should trigger the ripple for short touch interactions', () => {
      const { instance, container } = createTouchRipple();

      checkRipples(container, 0, 0);
      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      checkRipples(container, 0, 0);

      clock.tick(DELAY_RIPPLE / 2);
      checkRipples(container, 0, 0);
      instance.stop({ type: 'touchend', persist: () => {} }, cb);
      checkRipples(container, 1, 0);

      clock.tick(1);
      checkRipples(container, 0, 1);
    });

    it('should interrupt the ripple schedule', () => {
      const { instance, container } = createTouchRipple();

      checkRipples(container, 0, 0);
      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      checkRipples(container, 0, 0);

      clock.tick(DELAY_RIPPLE / 2);
      checkRipples(container, 0, 0);

      instance.stop({ type: 'touchmove' });
      clock.tick(DELAY_RIPPLE);
      checkRipples(container, 0, 0);
    });
  });
});
