// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import Ripple, { styleSheet } from './Ripple';

describe('<Ripple />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a span', () => {
    const wrapper = shallow(<Ripple rippleX={0} rippleY={0} rippleSize={10} />);
    assert.strictEqual(wrapper.name(), 'span');
  });

  it('should have the ripple className', () => {
    const wrapper = shallow(<Ripple rippleX={0} rippleY={0} rippleSize={11} />);
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.ripple),
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
      wrapper = shallow(<Ripple rippleX={0} rippleY={0} rippleSize={11} />);
    });

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');

      wrapper.instance().componentWillEnter();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(
        wrapper.childAt(0).hasClass(classes.rippleVisible),
        true,
        'should have the visible class',
      );
    });

    it('should stop the ripple', done => {
      wrapper.instance().componentWillLeave(done);
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleLeaving'), true, 'should be leaving');
      assert.strictEqual(
        wrapper.hasClass(classes.rootLeaving),
        true,
        'should have the leaving class',
      );
    });
  });

  describe('pulsating and stopping', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Ripple rippleX={0} rippleY={0} rippleSize={11} pulsate />);
    });

    it('should render the ripple inside a pulsating span', () => {
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(
        wrapper.hasClass(classes.rootPulsating),
        true,
        'should have the pulsating class',
      );
      const ripple = wrapper.childAt(0);
      assert.strictEqual(ripple.hasClass(classes.ripple), true, 'should have the ripple class');
      assert.strictEqual(ripple.hasClass(classes.rippleFast), true, 'should have the fast class');
    });

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');

      wrapper.instance().componentWillEnter();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(
        wrapper.hasClass(classes.rootPulsating),
        true,
        'should have the pulsating class',
      );
      assert.strictEqual(
        wrapper.childAt(0).hasClass(classes.rippleVisible),
        true,
        'should have the visible class',
      );
    });

    it('should stop the ripple', done => {
      wrapper.instance().componentWillLeave(done);
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleLeaving'), true, 'should be leaving');
      assert.strictEqual(
        wrapper.hasClass(classes.rootLeaving),
        true,
        'should have the leaving class',
      );
    });
  });

  describe('pulsating and stopping', () => {
    let mount;
    let wrapper;
    let clock;

    before(() => {
      mount = createMount();
      wrapper = mount(<Ripple rippleX={0} rippleY={0} rippleSize={11} pulsate />);
      clock = useFakeTimers();
    });

    after(() => {
      mount.cleanUp();
      clock.restore();
    });

    it('componentWillLeave should trigger a timer', () => {
      const callbackSpy = spy();
      wrapper.instance().componentWillLeave(callbackSpy);
      clock.tick(549);
      assert.strictEqual(callbackSpy.callCount, 0, 'The timer is not finished yet');
      clock.tick(1);
      assert.strictEqual(
        callbackSpy.callCount,
        1,
        'componentWillLeave callback should have been called',
      );
    });

    it('unmount should defuse the componentWillLeave timer', () => {
      const callbackSpy = spy();
      wrapper.instance().componentWillLeave(callbackSpy);
      wrapper.unmount();
      clock.tick(550);
      assert.strictEqual(
        callbackSpy.callCount,
        0,
        'componentWillLeave callback should not be called',
      );
    });
  });
});
