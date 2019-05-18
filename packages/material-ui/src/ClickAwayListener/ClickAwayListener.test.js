import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import ClickAwayListener from './ClickAwayListener';

function fireBodyMouseEvent(name, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach(key => {
    event[key] = properties[key];
  });
  document.body.dispatchEvent(event);
  return event;
}

describe('<ClickAwayListener />', () => {
  let mount;
  let wrapper;

  before(() => {
    mount = createMount({ strict: true });
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

      const event = fireBodyMouseEvent('click');

      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [event]);
    });

    it('should not be call when clicking inside', () => {
      const handleClickAway = spy();
      const ref = React.createRef();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );

      const event = new window.Event('click', { view: window, bubbles: true, cancelable: true });
      const el = ref.current;
      if (el) {
        el.dispatchEvent(event);
      }

      assert.strictEqual(handleClickAway.callCount, 0);
    });

    it('should not be call when defaultPrevented', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
      );
      const preventDefault = event => event.preventDefault();
      window.document.body.addEventListener('click', preventDefault);

      const event = new window.Event('click', { view: window, bubbles: true, cancelable: true });
      window.document.body.dispatchEvent(event);
      assert.strictEqual(handleClickAway.callCount, 0);

      window.document.body.removeEventListener('click', preventDefault);
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
      fireBodyMouseEvent('click');
      assert.strictEqual(handleClickAway.callCount, 0);
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
          <span>Hello</span>
        </ClickAwayListener>,
      );
      fireBodyMouseEvent('mouseup');
      assert.strictEqual(handleClickAway.callCount, 0);
      const mouseDownEvent = fireBodyMouseEvent('mousedown');
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
      fireBodyMouseEvent('touchend');
      assert.strictEqual(handleClickAway.callCount, 0);
    });

    it('should call `props.onClickAway` when the appropriate touch event is triggered', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchStart">
          <span>Hello</span>
        </ClickAwayListener>,
      );
      fireBodyMouseEvent('touchend');
      assert.strictEqual(handleClickAway.callCount, 0);
      const touchStartEvent = fireBodyMouseEvent('touchstart');
      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [touchStartEvent]);
    });

    it('should ignore `touchend` when preceded by `touchmove` event', () => {
      const handleClickAway = spy();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchEnd">
          <span>Hello</span>
        </ClickAwayListener>,
      );
      fireBodyMouseEvent('touchstart');
      fireBodyMouseEvent('touchmove');
      fireBodyMouseEvent('touchend');
      assert.strictEqual(handleClickAway.callCount, 0);

      const touchEndEvent = fireBodyMouseEvent('touchend');
      assert.strictEqual(handleClickAway.callCount, 1);
      assert.deepEqual(handleClickAway.args[0], [touchEndEvent]);
    });
  });

  it('should handle null child', () => {
    const Child = React.forwardRef(() => null);
    const handleClickAway = spy();
    wrapper = mount(
      <ClickAwayListener onClickAway={handleClickAway}>
        <Child />
      </ClickAwayListener>,
    );
    fireBodyMouseEvent('click');
    assert.strictEqual(handleClickAway.callCount, 0);
  });
});
