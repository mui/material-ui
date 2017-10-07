// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { Target, Popper } from 'react-popper';
import { ShallowWrapper } from 'enzyme';
import { createShallow, createMount, getClasses } from '../test-utils';
import createMuiTheme from '../styles/createMuiTheme';
import Tooltip from './Tooltip';

function getChildren(wrapper) {
  return new ShallowWrapper(
    wrapper
      .find(Target)
      .props()
      .children({}).props.element,
    wrapper,
  );
}

describe('<Tooltip />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(
      <Tooltip title="Hello World">
        <span>Hello World</span>
      </Tooltip>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Manager', () => {
    const wrapper = shallow(
      <Tooltip title="Hello World">
        <span>Hello World</span>
      </Tooltip>,
    );
    assert.strictEqual(wrapper.name(), 'Manager');
  });

  it('should render with the user, root and tooltip classes', () => {
    const wrapper = shallow(
      <Tooltip className="woofTooltip" title="Hello World">
        <span>Hello World</span>
      </Tooltip>,
    );
    assert.strictEqual(wrapper.hasClass('woofTooltip'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper
        .find(Popper)
        .childAt(0)
        .hasClass(classes.tooltip),
      true,
    );
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const wrapper = shallow(
        <Tooltip placement="top" title="Hello World">
          <span>Hello World</span>
        </Tooltip>,
      );
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(
        wrapper
          .find(Popper)
          .childAt(0)
          .hasClass(classes.tooltip),
        true,
      );
      wrapper.childAt(0).simulate('click');
      assert.strictEqual(
        wrapper
          .find(Popper)
          .childAt(0)
          .hasClass(classes.tooltipTop),
        true,
      );
    });

    const theme = createMuiTheme({
      direction: 'rtl',
    });

    [
      {
        in: 'bottom-end',
        out: 'bottom-start',
      },
      {
        in: 'bottom-start',
        out: 'bottom-end',
      },
      {
        in: 'top-end',
        out: 'top-start',
      },
      {
        in: 'top-start',
        out: 'top-end',
      },
      {
        in: 'top',
        out: 'top',
      },
    ].forEach(test => {
      it(`should flip ${test.in} when direction=rtl is used`, () => {
        const wrapper = shallow(
          <Tooltip theme={theme} placement={test.in} title="Hello World">
            <span>Hello World</span>
          </Tooltip>,
        );
        assert.strictEqual(wrapper.find(Popper).props().placement, test.out);
      });
    });
  });

  it('should call handleRequestClose & handleRequestOpen', () => {
    const wrapper = shallow(
      <Tooltip placement="top" title="Hello World">
        <button>Hello World</button>
      </Tooltip>,
    );
    const children = getChildren(wrapper);
    assert.strictEqual(wrapper.state().open, false);
    children.simulate('mouseOver', {});
    assert.strictEqual(wrapper.state().open, true);
    children.simulate('blur', {});
    assert.strictEqual(wrapper.state().open, false);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleRequestClose = spy();

    const wrapper = shallow(
      <Tooltip
        placement="top"
        title="Hello World"
        open
        onRequestOpen={handleRequestOpen}
        onRequestClose={handleRequestClose}
      >
        <button>Hello World</button>
      </Tooltip>,
    );
    const children = getChildren(wrapper);
    assert.strictEqual(handleRequestOpen.callCount, 0);
    assert.strictEqual(handleRequestClose.callCount, 0);
    children.simulate('mouseOver', { type: 'mouseover' });
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleRequestClose.callCount, 0);
    children.simulate('blur', { type: 'blur' });
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleRequestClose.callCount, 1);
  });

  describe('touch screen', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should not respond to quick events', () => {
      const wrapper = shallow(
        <Tooltip title="Hello World">
          <button>Hello World</button>
        </Tooltip>,
      );
      const children = getChildren(wrapper);
      children.simulate('touchStart', { type: 'touchstart', persist: () => {} });
      children.simulate('touchEnd', { type: 'touchend', persist: () => {} });
      children.simulate('focus', { type: 'focus' });
      children.simulate('mouseover', { type: 'mouseover' });
      assert.strictEqual(wrapper.state().open, false);
    });

    it('should open on long press', () => {
      const wrapper = shallow(
        <Tooltip title="Hello World">
          <button>Hello World</button>
        </Tooltip>,
      );
      const children = getChildren(wrapper);
      children.simulate('touchStart', { type: 'touchstart', persist: () => {} });
      children.simulate('focus', { type: 'focus' });
      children.simulate('mouseover', { type: 'mouseover' });
      clock.tick(1e3);
      assert.strictEqual(wrapper.state().open, true);
      children.simulate('touchEnd', { type: 'touchend', persist: () => {} });
      clock.tick(1500);
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      // eslint-disable-next-line react/prop-types
      const Hack = ({ style, innerRef, ...other }) => <div ref={innerRef} {...other} />;

      mount(
        <Tooltip title="Hello World" PopperProps={{ component: Hack }}>
          <button>Hello World</button>
        </Tooltip>,
      );
    });
  });

  describe('prop: delay', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should take the enterDelay into account', () => {
      const wrapper = shallow(
        <Tooltip enterDelay={111} title="Hello World">
          <button>Hello World</button>
        </Tooltip>,
      );
      const children = getChildren(wrapper);
      children.simulate('focus', { type: 'focus' });
      assert.strictEqual(wrapper.state().open, false);
      clock.tick(111);
      assert.strictEqual(wrapper.state().open, true);
    });

    it('should take the leaveDelay into account', () => {
      const wrapper = shallow(
        <Tooltip leaveDelay={111} title="Hello World">
          <button>Hello World</button>
        </Tooltip>,
      );
      const children = getChildren(wrapper);
      children.simulate('focus', { type: 'focus' });
      assert.strictEqual(wrapper.state().open, true);
      children.simulate('blur', { type: 'blur' });
      assert.strictEqual(wrapper.state().open, true);
      clock.tick(111);
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('prop: overrides', () => {
    [
      'onTouchStart',
      'onTouchEnd',
      'onMouseOver',
      'onMouseLeave',
      'onFocus',
      'onBlur',
    ].forEach(name => {
      it(`should be transparent for the ${name} event`, () => {
        const handler = spy();
        const wrapper = shallow(
          <Tooltip title="Hello World">
            <button {...{ [name]: handler }}>Hello World</button>
          </Tooltip>,
        );
        const children = getChildren(wrapper);
        const type = name.slice(2).toLowerCase();
        children.simulate(type, { type, persist: () => {} });
        assert.strictEqual(handler.callCount, 1);
      });
    });
  });
});
