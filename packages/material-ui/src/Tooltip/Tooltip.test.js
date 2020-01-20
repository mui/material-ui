/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { assert, expect } from 'chai';
import PropTypes from 'prop-types';
import { spy, useFakeTimers } from 'sinon';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Popper from '../Popper';
import Tooltip, { testReset } from './Tooltip';
import Input from '../Input';

function focusVisibleLegacy(wrapper) {
  document.dispatchEvent(new window.Event('keydown'));
  wrapper.simulate('focus');
}

function focusVisible(element) {
  act(() => {
    element.blur();
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
    element.focus();
  });
}

function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  document.dispatchEvent(new window.Event('pointerdown'));
}

describe('<Tooltip />', () => {
  let mount;
  let classes;
  const render = createClientRender({ strict: false });
  let clock;
  const defaultProps = {
    children: (
      <button id="testChild" type="submit">
        Hello World
      </button>
    ),
    title: 'Hello World',
  };

  before(() => {
    classes = getClasses(<Tooltip {...defaultProps} />);
  });

  beforeEach(() => {
    testReset();
    clock = useFakeTimers();
    // StrictModeViolation: uses Grow and tests a lot of impl details
    mount = createMount({ strict: undefined });
  });

  afterEach(() => {
    clock.restore();
    mount.cleanUp();
  });

  describeConformance(<Tooltip {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render the correct structure', () => {
    const wrapper = mount(<Tooltip {...defaultProps} />);
    const children = wrapper.childAt(0);
    assert.strictEqual(children.childAt(1).type(), Popper);
    assert.strictEqual(children.childAt(1).hasClass(classes.popper), true);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      const children = wrapper.find('button');
      assert.strictEqual(children.props().title, null);
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      const wrapper = mount(<Tooltip {...defaultProps} open />);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });

    it('should not display if the title is an empty string', () => {
      const wrapper = mount(<Tooltip {...defaultProps} title="" open />);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });

    it('should be passed down to the child as a native title', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World">
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      const children = wrapper.find('button');
      assert.strictEqual(children.props().title, 'Hello World');
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const wrapper = mount(<Tooltip {...defaultProps} placement="top" />);
      assert.strictEqual(wrapper.find(Popper).props().placement, 'top');
    });
  });

  it('should respond to external events', () => {
    const wrapper = mount(<Tooltip {...defaultProps} />);
    const children = wrapper.find('#testChild');
    assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    children.simulate('mouseOver');
    assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    children.simulate('mouseLeave');
    clock.tick(0);
    wrapper.update();
    assert.strictEqual(wrapper.find(Popper).props().open, false);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleClose = spy();

    const wrapper = mount(
      <Tooltip {...defaultProps} open onOpen={handleRequestOpen} onClose={handleClose} />,
    );
    const children = wrapper.find('#testChild');
    assert.strictEqual(handleRequestOpen.callCount, 0);
    assert.strictEqual(handleClose.callCount, 0);
    children.simulate('mouseOver');
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleClose.callCount, 0);
    children.simulate('mouseLeave');
    clock.tick(0);
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleClose.callCount, 1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);
      const children = wrapper.find('#testChild');
      children.simulate('touchStart');
      children.simulate('touchEnd');
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });

    it('should open on long press', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);
      const children = wrapper.find('#testChild');
      children.simulate('touchStart');
      clock.tick(1000);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      children.simulate('touchEnd');
      children.simulate('blur');
      clock.tick(1500);
      wrapper.update();
      assert.strictEqual(wrapper.find(Popper).props().open, false);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      mount(<Tooltip {...defaultProps} open />);
    });

    it('should handle autoFocus + onFocus forwarding', () => {
      const AutoFocus = props => (
        <div>
          {props.open ? (
            <Tooltip title="Title">
              <Input value="value" autoFocus />
            </Tooltip>
          ) : null}
        </div>
      );
      AutoFocus.propTypes = {
        open: PropTypes.bool,
      };

      const wrapper = mount(<AutoFocus />);
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
      clock.tick(0);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });
  });

  describe('prop: delay', () => {
    it('should take the enterDelay into account', () => {
      const wrapper = mount(<Tooltip {...defaultProps} enterDelay={111} />);
      simulatePointerDevice();
      const children = wrapper.find('#testChild');
      focusVisibleLegacy(children);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
      clock.tick(111);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });

    it('should use hysteresis with the enterDelay', () => {
      const { container } = render(
        <Tooltip
          {...defaultProps}
          enterDelay={111}
          leaveDelay={5}
          TransitionProps={{ timeout: 6 }}
        />,
      );
      const children = container.querySelector('#testChild');
      focusVisible(children);
      expect(document.body.querySelectorAll('[role="tooltip"]').length).to.equal(0);
      clock.tick(111);
      expect(document.body.querySelectorAll('[role="tooltip"]').length).to.equal(1);
      document.activeElement.blur();
      clock.tick(5);
      clock.tick(6);
      expect(document.body.querySelectorAll('[role="tooltip"]').length).to.equal(0);

      focusVisible(children);
      // Bypass `enterDelay` wait, instant display.
      expect(document.body.querySelectorAll('[role="tooltip"]').length).to.equal(1);
    });

    it('should take the leaveDelay into account', () => {
      const childRef = React.createRef();
      const wrapper = mount(
        <Tooltip leaveDelay={111} enterDelay={0} title="tooltip">
          <span id="testChild" ref={childRef} />
        </Tooltip>,
      );
      simulatePointerDevice();
      const children = wrapper.find('#testChild');
      focusVisibleLegacy(children);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      children.simulate('blur');
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      clock.tick(111);
      wrapper.update();
      assert.strictEqual(wrapper.find(Popper).props().open, false);
    });
  });

  describe('prop: overrides', () => {
    [
      'onTouchStart',
      'onTouchEnd',
      'onMouseEnter',
      'onMouseOver',
      'onMouseLeave',
      'onFocus',
      'onBlur',
    ].forEach(name => {
      it(`should be transparent for the ${name} event`, () => {
        const handler = spy();
        const wrapper = mount(
          <Tooltip {...defaultProps} title="Hello World">
            <button id="testChild" type="submit" {...{ [name]: handler }}>
              Hello World
            </button>
          </Tooltip>,
        );
        const children = wrapper.find('#testChild');
        const type = name.slice(2).toLowerCase();
        children.simulate(type);
        clock.tick(0);
        assert.strictEqual(handler.callCount, 1);
      });
    });

    it('should ignore event from the tooltip', () => {
      const handleMouseOver = spy();
      const { getByRole } = render(
        <Tooltip {...defaultProps} open interactive>
          <button type="submit" onMouseOver={handleMouseOver}>
            Hello World
          </button>
        </Tooltip>,
      );
      fireEvent.mouseOver(getByRole('tooltip'));
      expect(handleMouseOver.callCount).to.equal(0);
    });
  });

  describe('disabled button warning', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should not raise a warning if title is empty', () => {
      mount(
        <Tooltip title="">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 0, 'should not call console.error');
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      mount(
        <Tooltip title="Hello World">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: you are providing a disabled `button` child to the Tooltip component/,
      );
    });

    it('should not raise a warning when we are controlled', () => {
      mount(
        <Tooltip title="Hello World" open>
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });
  });

  describe('prop: interactive', () => {
    it('should keep the overlay open if the popper element is hovered', () => {
      const wrapper = mount(
        <Tooltip title="Hello World" interactive leaveDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const children = wrapper.find('#testChild');
      children.simulate('mouseOver', { type: 'mouseOver' });
      clock.tick(0);
      assert.strictEqual(wrapper.find(Popper).props().open, true);
      const popper = wrapper.find(Popper);
      children.simulate('mouseLeave', { type: 'mouseleave' });
      assert.strictEqual(wrapper.find(Popper).props().open, true);
      popper.simulate('mouseOver', { type: 'mouseover' });
      clock.tick(111);
      assert.strictEqual(wrapper.find(Popper).props().open, true);
    });

    it('should not animate twice', () => {
      const wrapper = mount(
        <Tooltip title="Hello World" interactive enterDelay={500}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const children = wrapper.find('#testChild');
      children.simulate('mouseOver', { type: 'mouseOver' });
      clock.tick(500);
      wrapper.update();
      assert.strictEqual(wrapper.find(Popper).props().open, true);
      const popper = wrapper.find(Popper);
      children.simulate('mouseLeave', { type: 'mouseleave' });
      assert.strictEqual(wrapper.find(Popper).props().open, true);
      popper.simulate('mouseOver', { type: 'mouseover' });
      clock.tick(0);
      assert.strictEqual(wrapper.find(Popper).props().open, true);
    });
  });

  describe('forward', () => {
    it('should forward props to the child element', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} className="foo">
          <h1 className="bar">H1</h1>
        </Tooltip>,
      );
      assert.strictEqual(wrapper.find('h1').props().className, 'foo bar');
    });

    it('should respect the props priority', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} hidden>
          <h1 hidden={false}>H1</h1>
        </Tooltip>,
      );
      assert.strictEqual(wrapper.find('h1').props().hidden, false);
    });
  });

  describe('focus', () => {
    function Test() {
      return (
        <Tooltip enterDelay={0} leaveDelay={0} title="Some information">
          <button id="target" type="button">
            Do something
          </button>
        </Tooltip>
      );
    }

    it('ignores base focus', () => {
      const wrapper = mount(<Test />);
      simulatePointerDevice();

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);

      wrapper.find('#target').simulate('focus');

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });

    it('opens on focus-visible', () => {
      const wrapper = mount(<Test />);
      simulatePointerDevice();

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);

      focusVisibleLegacy(wrapper.find('#target'));

      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);

      wrapper.setProps({ open: true });
      assert.include(
        consoleErrorMock.args()[0][0],
        'A component is changing an uncontrolled Tooltip to be controlled.',
      );
    });
  });

  it('should use the same popper.js instance between two renders', () => {
    const popperRef = React.createRef();
    const { forceUpdate } = render(
      <Tooltip
        {...defaultProps}
        open
        PopperProps={{
          popperRef,
        }}
      />,
    );
    const firstPopperInstance = popperRef.current;
    forceUpdate();
    expect(firstPopperInstance).to.equal(popperRef.current);
  });
});
