// @flow

import * as React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import Ripple from './Ripple';

describe('<Ripple />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow();
    classes = {
      wrapperLeaving: 'wrapperLeaving',
      wrapperPulsating: 'wrapperPulsating',
      fast: 'fast',
      ripple: 'ripple',
      rippleVisible: 'rippleVisible',
      rippleFast: 'rippleFast',
    };
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Transition', () => {
    const wrapper = shallow(
      <Ripple classes={classes} timeout={{}} rippleX={0} rippleY={0} rippleSize={10} />,
    );
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  it('should have the ripple className', () => {
    const wrapper = shallow(
      <Ripple classes={classes} timeout={{}} rippleX={0} rippleY={0} rippleSize={11} />,
    );
    assert.strictEqual(
      wrapper.childAt(0).childAt(0).hasClass(classes.ripple),
      true,
      'should have the ripple class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.fast),
      false,
      'should not have the fast (pulse) class',
    );
  });

  describe('starting and stopping', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <Ripple
          classes={classes}
          timeout={{
            exit: 0,
            enter: 0,
          }}
          in={false}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
        />,
      );
    });

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state().rippleVisible, false, 'should not be visible');
      wrapper.setProps({
        in: true,
      });
      assert.strictEqual(wrapper.state().rippleVisible, true, 'should be visible');
      assert.strictEqual(
        wrapper.childAt(0).hasClass(classes.rippleVisible),
        true,
        'should have the visible class',
      );
    });

    it('should stop the ripple', () => {
      wrapper.setProps({
        in: true,
      });
      wrapper.setProps({
        in: false,
      });
      assert.strictEqual(wrapper.state().rippleLeaving, true, 'should be leaving');
      assert.strictEqual(
        wrapper.hasClass(classes.wrapperLeaving),
        true,
        'should have the leaving class',
      );
    });
  });

  describe('pulsating and stopping', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <Ripple
          classes={classes}
          timeout={{
            enter: 0,
            exit: 0,
          }}
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
      assert.strictEqual(
        wrapper.hasClass(classes.wrapperPulsating),
        true,
        'should have the pulsating class',
      );
      const ripple = wrapper.childAt(0);
      assert.strictEqual(ripple.hasClass(classes.ripple), true, 'should have the ripple class');
      assert.strictEqual(ripple.hasClass(classes.rippleFast), true, 'should have the fast class');
    });

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state().rippleVisible, false, 'should not be visible');
      wrapper.setProps({
        in: true,
      });
      assert.strictEqual(wrapper.state().rippleVisible, true, 'should be visible');
      assert.strictEqual(
        wrapper.hasClass(classes.wrapperPulsating),
        true,
        'should have the pulsating class',
      );
      assert.strictEqual(
        wrapper.childAt(0).hasClass(classes.rippleVisible),
        true,
        'should have the visible class',
      );
    });

    it('should stop the ripple', () => {
      wrapper.setProps({
        in: false,
      });
      assert.strictEqual(wrapper.state().rippleLeaving, true, 'should be leaving');
      assert.strictEqual(
        wrapper.hasClass(classes.wrapperLeaving),
        true,
        'should have the leaving class',
      );
    });
  });

  describe('pulsating and stopping', () => {
    let wrapper;
    let clock;
    let callbackSpy;

    beforeEach(() => {
      callbackSpy = spy();
      wrapper = mount(
        <Ripple
          classes={classes}
          timeout={{
            exit: 550,
          }}
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
      wrapper.setProps({
        in: false,
      });
      clock.tick(549);
      assert.strictEqual(callbackSpy.callCount, 0, 'The timer is not finished yet');
      clock.tick(1);
      assert.strictEqual(callbackSpy.callCount, 1, 'handleExit callback should have been called');
    });

    it('unmount should defuse the handleExit timer', () => {
      wrapper.setProps({
        in: false,
      });
      wrapper.unmount();
      clock.tick(550);
      assert.strictEqual(callbackSpy.callCount, 0, 'handleExit callback should not be called');
    });
  });
});
