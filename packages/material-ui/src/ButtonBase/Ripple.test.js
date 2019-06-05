import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import TouchRipple from './TouchRipple';
import Ripple from './Ripple';

describe('<Ripple />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<TouchRipple />);
    mount = createMount({ strict: undefined });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Transition', () => {
    const wrapper = mount(
      <Ripple classes={classes} timeout={{}} rippleX={0} rippleY={0} rippleSize={10} />,
    );
    assert.strictEqual(wrapper.find('Transition').exists(), true);
  });

  it('should have the ripple className', () => {
    const wrapper = mount(
      <Ripple classes={classes} timeout={{}} rippleX={0} rippleY={0} rippleSize={11} />,
    );
    const rippleWrapper = wrapper.find('span').first();
    assert.strictEqual(rippleWrapper.hasClass(classes.ripple), true);
    assert.strictEqual(rippleWrapper.hasClass(classes.fast), false);
  });

  describe('starting and stopping', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <Ripple
          classes={classes}
          timeout={{ exit: 0, enter: 0 }}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
        />,
      );
    });

    it('should start the ripple', () => {
      wrapper.setProps({ in: true });
      wrapper.update();
      const rippleWrapper = wrapper.find('span').first();
      assert.strictEqual(rippleWrapper.hasClass(classes.rippleVisible), true);
    });

    it('should stop the ripple', () => {
      wrapper.setProps({ in: true });
      wrapper.setProps({ in: false });
      wrapper.update();
      const childWrapper = wrapper.find('span').last();
      assert.strictEqual(childWrapper.hasClass(classes.childLeaving), true);
    });
  });

  describe('pulsating and stopping 1', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <Ripple
          classes={classes}
          timeout={{ enter: 0, exit: 0 }}
          in={false}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );
    });

    it('should render the ripple inside a pulsating Ripple', () => {
      assert.strictEqual(wrapper.name(), 'Ripple');
      const rippleWrapper = wrapper.find('span').first();
      assert.strictEqual(rippleWrapper.hasClass(classes.ripple), true);
      assert.strictEqual(rippleWrapper.hasClass(classes.ripplePulsate), true);
      const childWrapper = wrapper.find('span').last();
      assert.strictEqual(childWrapper.hasClass(classes.childPulsate), true);
    });

    it('should start the ripple', () => {
      wrapper.setProps({ in: true });
      wrapper.update();
      const rippleWrapper = wrapper.find('span').first();
      assert.strictEqual(rippleWrapper.hasClass(classes.rippleVisible), true);
      const childWrapper = wrapper.find('span').last();
      assert.strictEqual(childWrapper.hasClass(classes.childPulsate), true);
    });

    it('should stop the ripple', () => {
      wrapper.setProps({ in: true });
      wrapper.setProps({ in: false });
      wrapper.update();
      const childWrapper = wrapper.find('span').last();
      assert.strictEqual(childWrapper.hasClass(classes.childLeaving), true);
    });
  });

  describe('pulsating and stopping 2', () => {
    let wrapper;
    let clock;
    let callbackSpy;

    beforeEach(() => {
      callbackSpy = spy();
      wrapper = mount(
        <Ripple
          classes={classes}
          timeout={{ exit: 550 }}
          in
          onExited={callbackSpy}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('handleExit should trigger a timer', () => {
      wrapper.setProps({ in: false });
      clock.tick(549);
      assert.strictEqual(callbackSpy.callCount, 0);
      clock.tick(1);
      assert.strictEqual(callbackSpy.callCount, 1);
    });

    it('unmount should defuse the handleExit timer', () => {
      wrapper.setProps({ in: false });
      wrapper.unmount();
      clock.tick(550);
      assert.strictEqual(callbackSpy.callCount, 0);
    });
  });
});
