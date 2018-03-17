// @flow

import React from 'react';
import { findDOMNode } from 'react-dom';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '../test-utils';
import ClickAwayListener from './ClickAwayListener';

describe('<ClickAwayListener />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render the children', () => {
    const children = <span>Hello</span>;
    const wrapper = mount(<ClickAwayListener onClickAway={() => {}}>{children}</ClickAwayListener>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  describe('prop: onClickAway', () => {
    it('should be call when clicking away', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [event]);
      wrapper.unmount();
    });

    it('should not be call when clicking inside', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = new window.Event('mouseup', { view: window, bubbles: true, cancelable: true });
      const el = findDOMNode(wrapper.instance());
      if (el) {
        el.dispatchEvent(event);
      }

      assert.strictEqual(handleClickAway.callCount, 0);
      wrapper.unmount();
    });

    it('should not be call when defaultPrevented', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <ClickAwayListener onClickAway={event => event.preventDefault()}>
            <span>Hello</span>
          </ClickAwayListener>
        </ClickAwayListener>,
      );

      const event = new window.Event('mouseup', { view: window, bubbles: true, cancelable: true });
      window.document.body.dispatchEvent(event);
      assert.strictEqual(handleClickAway.callCount, 0);
      wrapper.unmount();
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent={false}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 0);
      wrapper.unmount();
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const mouseUpEvent = document.createEvent('MouseEvents');
      mouseUpEvent.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(mouseUpEvent);

      assert.strictEqual(handleClickAway.callCount, 0);

      const mouseDownEvent = document.createEvent('MouseEvents');
      mouseDownEvent.initEvent('mousedown', true, true);
      window.document.body.dispatchEvent(mouseDownEvent);

      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [mouseDownEvent]);
      wrapper.unmount();
    });
  });

  describe('prop: touchEvent', () => {
    it('should not call `props.onClickAway` when `props.touchEvent` is `false`', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent={false}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = document.createEvent('Events');
      event.initEvent('touchend', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 0);
      wrapper.unmount();
    });

    it('should call `props.onClickAway` when the appropriate touch event is triggered', () => {
      const handleClickAway = spy();
      const wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchStart">
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const touchEndEvent = document.createEvent('Events');
      touchEndEvent.initEvent('touchend', true, true);
      window.document.body.dispatchEvent(touchEndEvent);

      assert.strictEqual(handleClickAway.callCount, 0);

      const touchStartEvent = document.createEvent('Events');
      touchStartEvent.initEvent('touchstart', true, true);
      window.document.body.dispatchEvent(touchStartEvent);

      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [touchStartEvent]);
      wrapper.unmount();
    });
  });
});
