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

      const event = new window.Event('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      window.document.body.dispatchEvent(event);
      assert.strictEqual(handleClickAway.callCount, 0);
      wrapper.unmount();
    });
  });
});
