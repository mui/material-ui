// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { Target, Popper } from 'react-popper';
import { createShallow, createMount, getClasses } from '../test-utils';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<Tooltip title="Hello World">Hello World</Tooltip>);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Manager', () => {
    const wrapper = shallow(<Tooltip title="Hello World">Hello World</Tooltip>);
    assert.strictEqual(wrapper.name(), 'Manager');
  });

  it('should render with the user, root and tooltip classes', () => {
    const wrapper = shallow(
      <Tooltip className="woofTooltip" title="Hello World">
        Hello World
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

  it('should have top placement', () => {
    const wrapper = shallow(
      <Tooltip placement="top" title="Hello World">
        Hello World
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

  it('should call handleRequestClose & handleRequestOpen', () => {
    const wrapper = shallow(
      <Tooltip placement="top" title="Hello World">
        <button>Hello World</button>
      </Tooltip>,
    );
    assert.strictEqual(wrapper.state().open, false);
    wrapper
      .find(Target)
      .childAt(0)
      .simulate('mouseOver', {});
    assert.strictEqual(wrapper.state().open, true);
    wrapper
      .find(Target)
      .childAt(0)
      .simulate('blur', {});
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
    const children = wrapper.find(Target).childAt(0);
    assert.strictEqual(handleRequestOpen.callCount, 0);
    assert.strictEqual(handleRequestClose.callCount, 0);
    children.simulate('mouseOver', {
      type: 'mouseover',
    });
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleRequestClose.callCount, 0);
    children.simulate('blur', {
      type: 'blur',
    });
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
      const children = wrapper.find(Target).childAt(0);
      children.simulate('touchStart', {
        type: 'touchstart',
        persist: () => {},
      });
      children.simulate('touchEnd', {
        type: 'touchend',
        persist: () => {},
      });
      children.simulate('focus', {
        type: 'focus',
      });
      children.simulate('mouseover', {
        type: 'mouseover',
      });
      assert.strictEqual(wrapper.state().open, false);
    });

    it('should open on long press', () => {
      const wrapper = shallow(
        <Tooltip title="Hello World">
          <button>Hello World</button>
        </Tooltip>,
      );
      const children = wrapper.find(Target).childAt(0);
      children.simulate('touchStart', {
        type: 'touchstart',
        persist: () => {},
      });
      children.simulate('focus', {
        type: 'focus',
      });
      children.simulate('mouseover', {
        type: 'mouseover',
      });
      clock.tick(1e3);
      assert.strictEqual(wrapper.state().open, true);
      children.simulate('touchEnd', {
        type: 'touchend',
        persist: () => {},
      });
      clock.tick(1500);
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      // eslint-disable-next-line react/prop-types
      const Hack = ({ style, innerRef, ...other }) => <div ref={innerRef} {...other} />;

      mount(
        <Tooltip
          title="Hello World"
          PopperProps={{
            component: Hack,
          }}
        >
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
      const children = wrapper.find(Target).childAt(0);
      children.simulate('focus', {
        type: 'focus',
      });
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
      const children = wrapper.find(Target).childAt(0);
      children.simulate('focus', {
        type: 'focus',
      });
      assert.strictEqual(wrapper.state().open, true);
      children.simulate('blur', {
        type: 'blur',
      });
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
        const children = wrapper.find(Target).childAt(0);
        const type = name.slice(2).toLowerCase();
        children.simulate(type, { type, persist: () => {} });
        assert.strictEqual(handler.callCount, 1);
      });
    });
  });
});
