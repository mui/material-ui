/* eslint-env mocha */
import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import Drawer from './Drawer';
import getMuiTheme from '../styles/getMuiTheme';
import merge from 'lodash.merge';

describe('<Drawer />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});
  const fireBodyMouseEvent = (name, properties) => {
    const event = document.createEvent('MouseEvents');
    event.initEvent(name, true, true);
    merge(event, properties);
    document.body.dispatchEvent(event);
  };

  describe('propTypes', () => {
    it('accepts number in the width props', () => {
      shallowWithContext(
        <Drawer width={400} />
      );
    });

    it('accepts a percentage format in string', () => {
      shallowWithContext(
        <Drawer width="70%" />
      );
    });

    it('throws an error on wrong percentage format', () => {
      assert.throws(() => shallowWithContext(
        <Drawer width="80" />
      ), Error, 'Not a valid percentage format.');
    });
  });

  describe('touch', () => {
    it('opens and closes', () => {
      const wrapper = mountWithContext(<Drawer width={200} docked={false} />);
      assert.strictEqual(wrapper.state().open, false, 'should start closed');
      fireBodyMouseEvent('touchstart', {touches: [{pageX: 0, pageY: 0}]});
      assert.strictEqual(wrapper.instance().maybeSwiping, true, 'should be listening for swipe');
      fireBodyMouseEvent('touchmove', {touches: [{pageX: 20, pageY: 0}]});
      assert.strictEqual(wrapper.state().swiping, 'opening', 'should be opening');
      fireBodyMouseEvent('touchend', {changedTouches: [{pageX: 180, pageY: 0}]});
      assert.strictEqual(wrapper.state().open, true, 'should be open');
      fireBodyMouseEvent('touchstart', {touches: [{pageX: 200, pageY: 0}]});
      assert.strictEqual(wrapper.instance().maybeSwiping, true, 'should be listening for swipe');
      fireBodyMouseEvent('touchmove', {touches: [{pageX: 180, pageY: 0}]});
      assert.strictEqual(wrapper.state().swiping, 'closing', 'should be closing');
      fireBodyMouseEvent('touchend', {changedTouches: [{pageX: 20, pageY: 0}]});
      assert.strictEqual(wrapper.state().open, false, 'should be closed');
      wrapper.unmount();
    });

    it('removes event listeners on unmount', () => {
      const wrapper = mountWithContext(<Drawer width={200} docked={false} />);
      // Trigger listeners.
      fireBodyMouseEvent('touchstart', {touches: [{pageX: 0, pageY: 0}]});
      wrapper.unmount();
      // Should trigger setState warning if listeners aren't cleaned.
      fireBodyMouseEvent('touchmove', {touches: [{pageX: 20, pageY: 0}]});
    });
  });
});
