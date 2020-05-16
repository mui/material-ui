import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Tooltip, { testReset } from './Tooltip';
import Input from '../Input';
import { camelCase } from 'lodash/string';

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
  // StrictModeViolation: uses Grow and tests a lot of impl details
  const mount = createMount({ strict: null });
  let classes;
  const render = createClientRender({ strict: false });
  let clock;

  before(() => {
    classes = getClasses(
      <Tooltip title="Hello World">
        <button type="submit">Hello World</button>
      </Tooltip>,
    );
  });

  beforeEach(() => {
    testReset();
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.tick(800); // cleanup the hystersis timer
    clock.restore();
  });

  describeConformance(
    <Tooltip title="Hello World">
      <button type="submit">Hello World</button>
    </Tooltip>,
    () => ({
      classes,
      inheritComponent: 'button',
      mount,
      refInstanceof: window.HTMLButtonElement,
      skip: [
        'componentProp',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  it('should render a popper', () => {
    const { getByRole } = render(
      <Tooltip title="Hello World" open>
        <button type="submit">Hello World</button>
      </Tooltip>,
    );
    expect(getByRole('tooltip')).to.have.class(classes.popper);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      const { getByRole } = render(
        <Tooltip title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      expect(getByRole('button')).to.not.have.attribute('title', 'Hello World');
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      const { getByRole } = render(
        <Tooltip title="Hello World" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should not display if the title is an empty string', () => {
      const { queryByRole } = render(
        <Tooltip title="" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should be passed down to the child as a native title', () => {
      const { getByRole } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      expect(getByRole('button')).to.have.attribute('title', 'Hello World');
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const renderSpy = spy();
      function PopperSpy({ placement }) {
        renderSpy(placement);
        return null;
      }

      render(
        <Tooltip title="Hello World" PopperComponent={PopperSpy} placement="top">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(renderSpy.args[0][0]).to.equal('top');
    });
  });

  it('should respond to external events', () => {
    const { queryByRole, getByRole } = render(
      <Tooltip enterDelay={100} title="Hello World" TransitionProps={{ timeout: 10 }}>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>,
    );
    expect(queryByRole('tooltip')).to.equal(null);
    fireEvent.mouseOver(getByRole('button'));
    clock.tick(100);
    expect(getByRole('tooltip')).toBeVisible();
    fireEvent.mouseLeave(getByRole('button'));
    clock.tick(10);
    expect(queryByRole('tooltip')).to.equal(null);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleClose = spy();

    const { getByRole } = render(
      <Tooltip
        enterDelay={100}
        title="Hello World"
        onOpen={handleRequestOpen}
        onClose={handleClose}
        open
      >
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>,
    );

    expect(handleRequestOpen.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(0);
    fireEvent.mouseOver(getByRole('button'));
    clock.tick(100);
    expect(handleRequestOpen.callCount).to.equal(1);
    expect(handleClose.callCount).to.equal(0);
    fireEvent.mouseLeave(getByRole('button'));
    clock.tick(0);
    expect(handleRequestOpen.callCount).to.equal(1);
    expect(handleClose.callCount).to.equal(1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      fireEvent.touchStart(getByRole('button'));
      fireEvent.touchEnd(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should open on long press', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip
          enterTouchDelay={700}
          enterDelay={100}
          leaveTouchDelay={1500}
          title="Hello World"
          TransitionProps={{ timeout: 10 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      fireEvent.touchStart(getByRole('button'));
      clock.tick(700 + 100);
      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.touchEnd(getByRole('button'));
      getByRole('button').blur();
      clock.tick(1500 + 10);

      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should not open if disableTouchListener', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip title="Hello World" disableTouchListener>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.touchStart(getByRole('button'));
      fireEvent.mouseOver(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      render(
        <Tooltip title="Hello World" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
    });

    it('should handle autoFocus + onFocus forwarding', () => {
      const AutoFocus = (props) => (
        <div>
          {props.open ? (
            <Tooltip enterDelay={100} title="Title">
              <Input value="value" autoFocus />
            </Tooltip>
          ) : null}
        </div>
      );

      const { setProps, getByRole } = render(<AutoFocus />);
      setProps({ open: true });
      clock.tick(100);
      expect(getByRole('tooltip')).toBeVisible();
    });
  });

  describe('prop: delay', () => {
    it('should take the enterDelay into account', () => {
      const { queryByRole, getByRole } = render(
        <Tooltip title="Hello World" enterDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
      clock.tick(111);
      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should use hysteresis with the enterDelay', () => {
      const { queryByRole, getByRole } = render(
        <Tooltip
          title="Hello World"
          enterDelay={111}
          enterNextDelay={30}
          leaveDelay={5}
          TransitionProps={{ timeout: 6 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      const children = getByRole('button');
      focusVisible(children);
      expect(queryByRole('tooltip')).to.equal(null);
      clock.tick(111);
      expect(getByRole('tooltip')).toBeVisible();
      document.activeElement.blur();
      clock.tick(5);
      clock.tick(6);
      expect(queryByRole('tooltip')).to.equal(null);

      focusVisible(children);
      // Bypass `enterDelay` wait, use `enterNextDelay`.
      expect(queryByRole('tooltip')).to.equal(null);
      clock.tick(30);
      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should take the leaveDelay into account', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip leaveDelay={111} enterDelay={0} title="tooltip" TransitionProps={{ timeout: 10 }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));
      clock.tick(0);
      expect(getByRole('tooltip')).toBeVisible();
      getByRole('button').blur();
      expect(getByRole('tooltip')).toBeVisible();
      clock.tick(111 + 10);
      expect(queryByRole('tooltip')).to.equal(null);
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
        const { getByRole } = render(
          <Tooltip title="Hello World">
            <button id="testChild" type="submit" {...{ [name]: handler }}>
              Hello World
            </button>
          </Tooltip>,
        );
        const type = camelCase(name.slice(2));
        fireEvent[type](getByRole('button'));
        expect(handler.callCount).to.equal(1);
      });
    });

    it('should ignore event from the tooltip', () => {
      const handleMouseOver = spy();
      const { getByRole } = render(
        <Tooltip title="Hello World" open interactive>
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
      render(
        <Tooltip title="">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      expect(consoleErrorMock.callCount()).to.equal(0);
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      render(
        <Tooltip title="Hello World">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: You are providing a disabled `button` child to the Tooltip component/,
      );
    });

    it('should not raise a warning when we are controlled', () => {
      render(
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
      const { getByRole } = render(
        <Tooltip
          title="Hello World"
          enterDelay={100}
          interactive
          leaveDelay={111}
          TransitionProps={{ timeout: 10 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('button'));
      clock.tick(100);
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseLeave(getByRole('button'));
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseOver(getByRole('tooltip'));
      clock.tick(111 + 10);
      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should not animate twice', () => {
      const { getByRole } = render(
        <Tooltip title="Hello World" interactive enterDelay={500} TransitionProps={{ timeout: 10 }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('button'));
      clock.tick(500);
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseLeave(getByRole('button'));
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseOver(getByRole('tooltip'));
      clock.tick(10);
      expect(getByRole('tooltip')).toBeVisible();
    });
  });

  describe('prop: PopperProps', () => {
    it('should pass PopperProps to Popper Component', () => {
      const { getByTestId } = render(
        <Tooltip title="Hello World" open PopperProps={{ 'data-testid': 'popper' }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      expect(getByTestId('popper')).not.to.equal(null);
    });

    it('should merge popperOptions with arrow modifier', () => {
      const popperRef = React.createRef();
      render(
        <Tooltip
          title="Hello World"
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
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(popperRef.current.modifiers.find((x) => x.name === 'arrow').foo).to.equal('bar');
    });
  });

  describe('prop forwarding', () => {
    it('should forward props to the child element', () => {
      const { getByText } = render(
        <Tooltip title="Hello World" className="foo">
          <h1 className="bar">H1</h1>
        </Tooltip>,
      );
      expect(getByText('H1')).to.have.class('foo');
      expect(getByText('H1')).to.have.class('bar');
    });

    it('should respect the props priority', () => {
      const { getByText } = render(
        <Tooltip title="Hello World" name="tooltip">
          <h1 name="heading">H1</h1>
        </Tooltip>,
      );
      expect(getByText('H1')).to.have.attribute('name', 'heading');
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
      const { getByRole, queryByRole } = render(<Test />);
      simulatePointerDevice();

      expect(queryByRole('tooltip')).to.equal(null);

      getByRole('button').focus();

      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('opens on focus-visible', () => {
      const { queryByRole, getByRole } = render(<Test />);
      simulatePointerDevice();

      expect(queryByRole('tooltip')).to.equal(null);

      focusVisible(getByRole('button'));

      expect(getByRole('tooltip')).toBeVisible();
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
      const { setProps } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      setProps({ open: true });
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: A component is changing the uncontrolled open state of Tooltip to be controlled.',
      );
    });
  });

  it('should use the same popper.js instance between two renders', () => {
    const popperRef = React.createRef();
    const { forceUpdate } = render(
      <Tooltip
        title="Hello World"
        open
        PopperProps={{
          popperRef,
        }}
      >
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>,
    );
    const firstPopperInstance = popperRef.current;
    forceUpdate();
    expect(firstPopperInstance).to.equal(popperRef.current);
  });

  describe('prop: PopperComponent', () => {
    it('can render a different component', () => {
      const CustomPopper = () => <div data-testid="CustomPopper" />;
      const { getByTestId } = render(
        <Tooltip title="Hello World" open PopperComponent={CustomPopper}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(getByTestId('CustomPopper')).toBeVisible();
    });
  });
});
