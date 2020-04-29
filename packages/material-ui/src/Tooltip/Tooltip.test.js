import * as React from 'react';
import { expect } from 'chai';
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
    enterDelay: 0,
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
    expect(children.childAt(1).type()).to.equal(Popper);
    expect(children.childAt(1).hasClass(classes.popper)).to.equal(true);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      const children = wrapper.find('button');
      expect(children.props().title).to.equal(null);
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      const wrapper = mount(<Tooltip {...defaultProps} open />);
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
    });

    it('should not display if the title is an empty string', () => {
      const wrapper = mount(<Tooltip {...defaultProps} title="" open />);
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
    });

    it('should be passed down to the child as a native title', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World">
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      const children = wrapper.find('button');
      expect(children.props().title).to.equal('Hello World');
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const wrapper = mount(<Tooltip {...defaultProps} placement="top" />);
      expect(wrapper.find(Popper).props().placement).to.equal('top');
    });
  });

  it('should respond to external events', () => {
    const wrapper = mount(<Tooltip {...defaultProps} />);
    const children = wrapper.find('#testChild');
    expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
    children.simulate('mouseOver');
    expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
    children.simulate('mouseLeave');
    clock.tick(0);
    wrapper.update();
    expect(wrapper.find(Popper).props().open).to.equal(false);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleClose = spy();

    const wrapper = mount(
      <Tooltip {...defaultProps} open onOpen={handleRequestOpen} onClose={handleClose} />,
    );
    const children = wrapper.find('#testChild');
    expect(handleRequestOpen.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(0);
    children.simulate('mouseOver');
    expect(handleRequestOpen.callCount).to.equal(1);
    expect(handleClose.callCount).to.equal(0);
    children.simulate('mouseLeave');
    clock.tick(0);
    expect(handleRequestOpen.callCount).to.equal(1);
    expect(handleClose.callCount).to.equal(1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);
      const children = wrapper.find('#testChild');
      children.simulate('touchStart');
      children.simulate('touchEnd');
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
    });

    it('should open on long press', () => {
      const wrapper = mount(<Tooltip {...defaultProps} />);
      const children = wrapper.find('#testChild');
      children.simulate('touchStart');
      clock.tick(1000);
      wrapper.update();
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      children.simulate('touchEnd');
      children.simulate('blur');
      clock.tick(1500);
      wrapper.update();
      expect(wrapper.find(Popper).props().open).to.equal(false);
    });

    it('should not open if disableTouchListener', () => {
      const { container } = render(<Tooltip {...defaultProps} disableTouchListener />);
      const children = container.querySelector('#testChild');
      fireEvent.touchStart(children);
      fireEvent.mouseOver(children);
      expect(document.body.querySelectorAll('[role="tooltip"]').length).to.equal(0);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      mount(<Tooltip {...defaultProps} open />);
    });

    it('should handle autoFocus + onFocus forwarding', () => {
      const AutoFocus = (props) => (
        <div>
          {props.open ? (
            <Tooltip {...defaultProps} title="Title">
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
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
      clock.tick(0);
      wrapper.update();
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
    });
  });

  describe('prop: delay', () => {
    it('should take the enterDelay into account', () => {
      const wrapper = mount(<Tooltip {...defaultProps} enterDelay={111} />);
      simulatePointerDevice();
      const children = wrapper.find('#testChild');
      focusVisibleLegacy(children);
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
      clock.tick(111);
      wrapper.update();
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
    });

    it('should use hysteresis with the enterDelay', () => {
      const { container } = render(
        <Tooltip
          {...defaultProps}
          enterDelay={111}
          enterNextDelay={30}
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
      // Bypass `enterDelay` wait, use `enterNextDelay`.
      expect(document.body.querySelectorAll('[role="tooltip"]').length).to.equal(0);
      clock.tick(30);
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
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      children.simulate('blur');
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      clock.tick(111);
      wrapper.update();
      expect(wrapper.find(Popper).props().open).to.equal(false);
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
    ].forEach((name) => {
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
        expect(handler.callCount).to.equal(1);
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
      expect(consoleErrorMock.callCount()).to.equal(0);
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      mount(
        <Tooltip title="Hello World">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
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
      expect(consoleErrorMock.callCount()).to.equal(0);
    });
  });

  describe('prop: interactive', () => {
    it('should keep the overlay open if the popper element is hovered', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} title="Hello World" interactive leaveDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const children = wrapper.find('#testChild');
      children.simulate('mouseOver', { type: 'mouseOver' });
      clock.tick(0);
      expect(wrapper.find(Popper).props().open).to.equal(true);
      const popper = wrapper.find(Popper);
      children.simulate('mouseLeave', { type: 'mouseleave' });
      expect(wrapper.find(Popper).props().open).to.equal(true);
      popper.simulate('mouseOver', { type: 'mouseover' });
      clock.tick(111);
      expect(wrapper.find(Popper).props().open).to.equal(true);
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
      expect(wrapper.find(Popper).props().open).to.equal(true);
      const popper = wrapper.find(Popper);
      children.simulate('mouseLeave', { type: 'mouseleave' });
      expect(wrapper.find(Popper).props().open).to.equal(true);
      popper.simulate('mouseOver', { type: 'mouseover' });
      clock.tick(0);
      expect(wrapper.find(Popper).props().open).to.equal(true);
    });
  });

  describe('prop: PopperProps', () => {
    it('should pass PopperProps to Popper Component', () => {
      const { getByTestId } = render(
        <Tooltip {...defaultProps} open PopperProps={{ 'data-testid': 'popper' }} />,
      );

      expect(getByTestId('popper')).not.to.equal(null);
    });

    it('should merge popperOptions with arrow modifier', () => {
      const popperRef = React.createRef();
      render(
        <Tooltip
          {...defaultProps}
          open
          arrow
          PopperProps={{
            popperRef,
            popperOptions: {
              modifiers: {
                arrow: {
                  foo: 'bar',
                },
              },
            },
          }}
        />,
      );
      expect(popperRef.current.modifiers.find((x) => x.name === 'arrow').foo).to.equal('bar');
    });
  });

  describe('forward', () => {
    it('should forward props to the child element', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} className="foo">
          <h1 className="bar">H1</h1>
        </Tooltip>,
      );
      expect(wrapper.find('h1').props().className).to.equal('foo bar');
    });

    it('should respect the props priority', () => {
      const wrapper = mount(
        <Tooltip {...defaultProps} hidden>
          <h1 hidden={false}>H1</h1>
        </Tooltip>,
      );
      expect(wrapper.find('h1').props().hidden).to.equal(false);
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

      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);

      wrapper.find('#target').simulate('focus');

      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
    });

    it('opens on focus-visible', () => {
      const wrapper = mount(<Test />);
      simulatePointerDevice();

      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);

      focusVisibleLegacy(wrapper.find('#target'));

      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
    });

    // https://github.com/mui-org/material-ui/issues/19883
    it('should not prevent event handlers of children', () => {
      const handleFocus = spy((event) => event.currentTarget);
      // Tooltip should not assume that event handlers of children are attached to the
      // outermost host
      const TextField = React.forwardRef(function TextField(props, ref) {
        return (
          <div ref={ref}>
            <input type="text" {...props} />
          </div>
        );
      });
      const { getByRole } = render(
        <Tooltip interactive open title="test">
          <TextField onFocus={handleFocus} />
        </Tooltip>,
      );
      const input = getByRole('textbox');

      input.focus();

      // return value is event.currentTarget
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocus.returned(input)).to.equal(true);
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
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: a component is changing the uncontrolled open state of Tooltip to be controlled.',
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
