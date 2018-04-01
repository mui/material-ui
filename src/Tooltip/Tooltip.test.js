/* eslint-disable no-underscore-dangle */

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { Popper, Target } from 'react-popper';
import { ShallowWrapper } from 'enzyme';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import createMuiTheme from '../styles/createMuiTheme';
import Tooltip from './Tooltip';

function persist() {}

// Remove the style from the DOM element.
// eslint-disable-next-line react/prop-types
const Hack = ({ style, innerRef, ...other }) => <div ref={innerRef} {...other} />;

function getTargetChildren(wrapper) {
  return new ShallowWrapper(
    wrapper
      .find(Target)
      .props()
      .children({}).props.children,
    wrapper,
  );
}

function getPopperChildren(wrapper) {
  return new ShallowWrapper(
    wrapper
      .find(Popper)
      .props()
      .children({ popperProps: { style: {} }, restProps: {} }),
    null,
  );
}

describe('<Tooltip />', () => {
  let shallow;
  let mount;
  let classes;
  const TooltipNaked = unwrap(Tooltip);

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
    assert.strictEqual(wrapper.childAt(0).name(), 'EventListener');
  });

  it('should render with the user, root and tooltip classes', () => {
    const wrapper = shallow(
      <Tooltip className="woofTooltip" title="Hello World">
        <span>Hello World</span>
      </Tooltip>,
    );
    assert.strictEqual(wrapper.hasClass('woofTooltip'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);

    const popperChildren = getPopperChildren(wrapper);
    assert.strictEqual(popperChildren.childAt(0).hasClass(classes.tooltip), true);
  });

  describe('prop: title', () => {
    it('should not display if the title is an empty string', () => {
      const wrapper = shallow(
        <Tooltip open title="">
          <span>Hello World</span>
        </Tooltip>,
      );
      assert.strictEqual(wrapper.find(Popper).hasClass(classes.popperClose), true);
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const wrapper = shallow(
        <Tooltip placement="top" title="Hello World">
          <span>Hello World</span>
        </Tooltip>,
      );
      const popperChildren = getPopperChildren(wrapper);
      assert.strictEqual(popperChildren.childAt(0).hasClass(classes.tooltip), true);
      wrapper.childAt(0).simulate('click');
      assert.strictEqual(popperChildren.childAt(0).hasClass(classes.tooltipPlacementTop), true);
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

  it('should respond to external events', () => {
    const wrapper = shallow(
      <Tooltip placement="top" title="Hello World">
        <button>Hello World</button>
      </Tooltip>,
    );
    const children = getTargetChildren(wrapper);
    assert.strictEqual(wrapper.state().open, false);
    children.simulate('mouseOver', {});
    assert.strictEqual(wrapper.state().open, true);
    children.simulate('blur', {});
    assert.strictEqual(wrapper.state().open, false);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleClose = spy();

    const wrapper = shallow(
      <Tooltip
        placement="top"
        title="Hello World"
        open
        onOpen={handleRequestOpen}
        onClose={handleClose}
      >
        <button>Hello World</button>
      </Tooltip>,
    );
    const children = getTargetChildren(wrapper);
    assert.strictEqual(handleRequestOpen.callCount, 0);
    assert.strictEqual(handleClose.callCount, 0);
    children.simulate('mouseOver', { type: 'mouseover' });
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleClose.callCount, 0);
    children.simulate('blur', { type: 'blur' });
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleClose.callCount, 1);
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
      const children = getTargetChildren(wrapper);
      children.simulate('touchStart', { type: 'touchstart', persist });
      children.simulate('touchEnd', { type: 'touchend', persist });
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
      const children = getTargetChildren(wrapper);
      children.simulate('touchStart', { type: 'touchstart', persist });
      children.simulate('focus', { type: 'focus' });
      children.simulate('mouseover', { type: 'mouseover' });
      clock.tick(1e3);
      assert.strictEqual(wrapper.state().open, true);
      children.simulate('touchEnd', { type: 'touchend', persist });
      clock.tick(1500);
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
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
      const children = getTargetChildren(wrapper);
      children.simulate('focus', { type: 'focus', persist });
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
      const children = getTargetChildren(wrapper);
      children.simulate('focus', { type: 'focus' });
      assert.strictEqual(wrapper.state().open, true);
      children.simulate('blur', { type: 'blur', persist });
      assert.strictEqual(wrapper.state().open, true);
      clock.tick(111);
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('prop: overrides', () => {
    ['onTouchStart', 'onTouchEnd', 'onMouseOver', 'onMouseLeave', 'onFocus', 'onBlur'].forEach(
      name => {
        it(`should be transparent for the ${name} event`, () => {
          const handler = spy();
          const wrapper = shallow(
            <Tooltip title="Hello World">
              <button {...{ [name]: handler }}>Hello World</button>
            </Tooltip>,
          );
          const children = getTargetChildren(wrapper);
          const type = name.slice(2).toLowerCase();
          children.simulate(type, { type, persist });
          assert.strictEqual(handler.callCount, 1);
        });
      },
    );
  });

  describe('resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should recompute the correct position', () => {
      const handleUpdate = spy();
      const wrapper = mount(
        <TooltipNaked theme={{}} classes={{}} title="foo" PopperProps={{ component: Hack }}>
          <div>Foo</div>
        </TooltipNaked>,
      );
      const instance = wrapper.instance();
      instance.handleResize();
      assert.strictEqual(handleUpdate.callCount, 0);
      clock.tick(1);
      instance.popper._popper.scheduleUpdate = handleUpdate;
      clock.tick(165);
      assert.strictEqual(handleUpdate.callCount, 1);
    });
  });

  describe('disabled button warning', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should raise a warning when we can listen to events', () => {
      mount(
        <Tooltip title="Hello World">
          <button disabled>Hello World</button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: you are providing a disabled `button` child to the Tooltip component/,
      );
    });
  });
});
