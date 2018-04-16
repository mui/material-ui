// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '../test-utils';
import ClickAwayListener from './ClickAwayListener';

describe('<ClickAwayListener />', () => {
  let mount;
  let wrapper;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render the children', () => {
    const children = <span>Hello</span>;
    wrapper = mount(<ClickAwayListener onClickAway={() => {}}>{children}</ClickAwayListener>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  describe('prop: onClickAway', () => {
    it('should be call when clicking away', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [event]);
    });

    it('should not be call when clicking inside', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = new window.Event('mouseup', { view: window, bubbles: true, cancelable: true });
      const el = ReactDOM.findDOMNode(wrapper.instance());
      if (el) {
        el.dispatchEvent(event);
      }

      assert.strictEqual(handleClickAway.callCount, 0);
    });

    it('should not be call when defaultPrevented', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <ClickAwayListener onClickAway={event => event.preventDefault()}>
            <span>Hello</span>
          </ClickAwayListener>
        </ClickAwayListener>,
      );

      const event = new window.Event('mouseup', { view: window, bubbles: true, cancelable: true });
      window.document.body.dispatchEvent(event);
      assert.strictEqual(handleClickAway.callCount, 0);
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent={false}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 0);
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = spy();
      wrapper = mount(
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
    });
  });

  describe('prop: touchEvent', () => {
    it('should not call `props.onClickAway` when `props.touchEvent` is `false`', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent={false}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = document.createEvent('Events');
      event.initEvent('touchend', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 0);
    });

    it('should call `props.onClickAway` when the appropriate touch event is triggered', () => {
      const handleClickAway = spy();
      wrapper = mount(
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
    });
  });

  describe('IE11 issue', () => {
    it('should not call the hook if the event is triggered after being unmounted', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );
      wrapper.instance().mounted = false;

      const event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClickAway.callCount, 0);
    });
  });
});
