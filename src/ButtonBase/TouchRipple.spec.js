import React from 'react';
import { useFakeTimers } from 'sinon';
import { assert } from 'chai';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import TouchRipple, { DELAY_RIPPLE } from './TouchRipple';

describe('<TouchRipple />', () => {
  let shallow;
  let mount;
  let classes;
  const TouchRippleNaked = unwrap(TouchRipple);

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<TouchRipple />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a <ReactTransitionGroup> component', () => {
    const wrapper = shallow(<TouchRipple />);
    assert.strictEqual(wrapper.name(), 'TransitionGroup');
    assert.strictEqual(wrapper.props().component, 'span', 'should be pass a span as the component');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render the custom className', () => {
    const wrapper = shallow(<TouchRipple className="test-class-name" />);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should contain the test className');
  });

  describe('prop: center', () => {
    it('should should compute the right ripple dimensions', () => {
      const wrapper = shallow(<TouchRipple center />);
      const instance = wrapper.instance();
      instance.start(
        {},
        {
          fakeElement: true,
        },
      );
      wrapper.update();
      assert.strictEqual(wrapper.childAt(0).props().rippleSize, 1, 'should be odd');
    });
  });

  it('should create individual ripples', () => {
    const wrapper = mount(<TouchRippleNaked classes={{}} />);
    const instance = wrapper.instance();

    assert.strictEqual(wrapper.state().ripples.length, 0, 'should start with no ripples');

    instance.start({ clientX: 0, clientY: 0 });
    assert.strictEqual(wrapper.state().ripples.length, 1, 'should create a ripple');

    instance.start({ clientX: 0, clientY: 0 });
    assert.strictEqual(wrapper.state().ripples.length, 2, 'should create another ripple');

    instance.start({ clientX: 0, clientY: 0 });
    assert.strictEqual(wrapper.state().ripples.length, 3, 'should create another ripple');

    instance.stop({ type: 'mouseup' });
    assert.strictEqual(wrapper.state().ripples.length, 2, 'should remove a ripple');

    instance.stop({ type: 'mouseup' });
    assert.strictEqual(wrapper.state().ripples.length, 1, 'should remove a ripple');

    instance.stop({ type: 'mouseup' });
    assert.strictEqual(wrapper.state().ripples.length, 0, 'should remove all the ripples');
  });

  describe('creating unique ripples', () => {
    it('should create a ripple', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      instance.start(
        {},
        {
          pulsate: true,
          fakeElement: true,
        },
      );
      assert.strictEqual(wrapper.state().ripples.length, 1);
    });

    it('should ignore a mousedown event', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      instance.ignoringMouseDown = true;
      instance.start({ type: 'mousedown' });
      assert.strictEqual(wrapper.state().ripples.length, 0);
    });

    it('should set ignoringMouseDown to true', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      assert.strictEqual(instance.ignoringMouseDown, false);
      instance.start({ type: 'touchstart' }, { fakeElement: true });
      assert.strictEqual(wrapper.state().ripples.length, 1);
      assert.strictEqual(instance.ignoringMouseDown, true);
    });

    it('should create a specific ripple', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      const clientX = 1;
      const clientY = 1;
      instance.start({ clientX, clientY }, { fakeElement: true });
      assert.strictEqual(wrapper.state().ripples.length, 1);
      assert.strictEqual(wrapper.state().ripples[0].props.rippleX, clientX);
      assert.strictEqual(wrapper.state().ripples[0].props.rippleY, clientY);
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
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();

      assert.strictEqual(wrapper.state().ripples.length, 0);
      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true });
      assert.strictEqual(wrapper.state().ripples.length, 0);

      clock.tick(DELAY_RIPPLE);
      assert.strictEqual(wrapper.state().ripples.length, 1);

      clock.tick(DELAY_RIPPLE);
      instance.stop({ type: 'touchend' });
      assert.strictEqual(wrapper.state().ripples.length, 0);
    });

    it('should trigger the ripple for short touch interactions', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();

      assert.strictEqual(wrapper.state().ripples.length, 0);
      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true });
      assert.strictEqual(wrapper.state().ripples.length, 0);

      clock.tick(DELAY_RIPPLE / 2);
      assert.strictEqual(wrapper.state().ripples.length, 0);
      instance.stop({ type: 'touchend', persist: () => {} });
      assert.strictEqual(wrapper.state().ripples.length, 1);

      clock.tick(1);
      assert.strictEqual(wrapper.state().ripples.length, 0);
    });

    it('should interupt the ripple schedule', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();

      assert.strictEqual(wrapper.state().ripples.length, 0);
      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true });
      assert.strictEqual(wrapper.state().ripples.length, 0);

      clock.tick(DELAY_RIPPLE / 2);
      assert.strictEqual(wrapper.state().ripples.length, 0);

      instance.stop({ type: 'touchmove' });
      clock.tick(DELAY_RIPPLE);
      assert.strictEqual(wrapper.state().ripples.length, 0);
    });
  });
});
