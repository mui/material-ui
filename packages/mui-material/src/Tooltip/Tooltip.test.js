import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  simulatePointerDevice,
  focusVisible,
  programmaticFocusTriggersFocusVisible,
  reactMajor,
} from '@mui/internal-test-utils';
import { camelCase } from 'lodash/string';
import Tooltip, { tooltipClasses as classes } from '@mui/material/Tooltip';
import { testReset } from './Tooltip';
import describeConformance from '../../test/describeConformance';

describe('<Tooltip />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  beforeEach(() => {
    testReset();
  });

  function TestPopper(props) {
    const { children, className, 'data-testid': testId } = props;
    return (
      <div className={className} data-testid={testId ?? 'custom'}>
        {typeof children === 'function' ? children({}) : children}
      </div>
    );
  }

  describeConformance(
    <Tooltip title="Hello World" arrow open>
      <button type="submit">Hello World</button>
    </Tooltip>,
    () => ({
      classes,
      inheritComponent: 'button',
      render,
      muiName: 'MuiTooltip',
      refInstanceof: window.HTMLButtonElement,
      testRootOverrides: { slotName: 'popper', slotClassName: classes.popper },
      testDeepOverrides: { slotName: 'tooltip', slotClassName: classes.tooltip },
      testLegacyComponentsProp: true,
      slots: {
        popper: {
          expectedClassName: classes.popper,
          testWithComponent: TestPopper,
          testWithElement: null,
        },
        transition: { testWithElement: null },
        tooltip: { expectedClassName: classes.tooltip, testWithElement: null },
        arrow: { expectedClassName: classes.arrow },
      },
      skip: [
        'componentProp',
        'componentsProp',
        'themeVariants',
        'slotPropsCallback', // not supported yet
      ],
    }),
  );

  it('should render a popper', () => {
    render(
      <Tooltip title="Hello World" open>
        <button type="submit">Hello World</button>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip')).to.have.class(classes.popper);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      render(
        <Tooltip title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button')).not.to.have.attribute('title', 'Hello World');
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      render(
        <Tooltip title="Hello World" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should display if the title is 0', () => {
      render(
        <Tooltip title={0} open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should not display if the title is an empty string', () => {
      render(
        <Tooltip title="" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should not display if the title is a false', () => {
      render(
        <Tooltip title={false} open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should not display if the title is a null', () => {
      render(
        <Tooltip title={null} open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should not display if the title is an undefined', () => {
      render(
        <Tooltip title={undefined} open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should label the child when closed', () => {
      render(
        <Tooltip title="the title">
          <button data-testid="target">The content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('cannot label the child when closed with an exotic title', () => {
      render(
        <Tooltip title={<div>the title</div>}>
          <button data-testid="target">the content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the content');
      expect(target).not.to.have.attribute('title');
    });

    it('should label the child when open', () => {
      render(
        <Tooltip open title="the title">
          <button data-testid="target">The content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('should label the child when open with an exotic title', () => {
      render(
        <Tooltip open title={<div>the title</div>}>
          <button data-testid="target">The content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('can describe the child when closed', () => {
      render(
        <Tooltip describeChild title="the title">
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('the title');
      expect(target).to.have.attribute('title', 'the title');
    });

    it('cannot describe the child when closed with an exotic title', () => {
      render(
        <Tooltip describeChild title={<div>the title</div>}>
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('');
      expect(target).not.to.have.attribute('title');
    });

    it('can describe the child when open', () => {
      render(
        <Tooltip describeChild open title="the title">
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('can describe the child when open with an exotic title', () => {
      render(
        <Tooltip describeChild open title={<div>the title</div>}>
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('the title');
      expect(target).not.to.have.attribute('title');
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
    const transitionTimeout = 10;
    const enterDelay = 100;
    render(
      <Tooltip
        enterDelay={enterDelay}
        title="Hello World"
        TransitionProps={{ timeout: transitionTimeout }}
      >
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).to.equal(null);

    fireEvent.mouseOver(screen.getByRole('button'));
    clock.tick(enterDelay);

    expect(screen.getByRole('tooltip')).toBeVisible();

    fireEvent.mouseLeave(screen.getByRole('button'));
    // Tooltip schedules timeout even with no delay
    clock.tick(0);
    clock.tick(transitionTimeout);

    expect(screen.queryByRole('tooltip')).to.equal(null);
  });

  it('should be controllable', () => {
    const eventLog = [];

    const { setProps } = render(
      <Tooltip
        enterDelay={100}
        title="Hello World"
        onOpen={() => eventLog.push('open')}
        onClose={() => eventLog.push('close')}
        open={false}
      >
        <button
          id="testChild"
          onMouseLeave={() => eventLog.push('mouseleave')}
          onMouseOver={() => eventLog.push('mouseover')}
          type="submit"
        >
          Hello World
        </button>
      </Tooltip>,
    );

    expect(eventLog).to.deep.equal([]);

    fireEvent.mouseOver(screen.getByRole('button'));
    clock.tick(100);

    expect(eventLog).to.deep.equal(['mouseover', 'open']);
    setProps({ open: true });

    fireEvent.mouseLeave(screen.getByRole('button'));
    clock.tick(0);

    expect(eventLog).to.deep.equal(['mouseover', 'open', 'mouseleave', 'close']);
  });

  it('should not call onOpen again if already open', () => {
    const eventLog = [];
    render(
      <Tooltip enterDelay={100} title="Hello World" onOpen={() => eventLog.push('open')} open>
        <button data-testid="trigger" onMouseOver={() => eventLog.push('mouseover')} />
      </Tooltip>,
    );

    expect(eventLog).to.deep.equal([]);

    fireEvent.mouseOver(screen.getByTestId('trigger'));
    clock.tick(100);

    expect(eventLog).to.deep.equal(['mouseover']);
  });

  it('should not call onClose if already closed', () => {
    const eventLog = [];
    render(
      <Tooltip title="Hello World" onClose={() => eventLog.push('close')} open={false}>
        <button data-testid="trigger" onMouseLeave={() => eventLog.push('mouseleave')} />
      </Tooltip>,
    );

    fireEvent.mouseLeave(screen.getByTestId('trigger'));
    clock.tick(0);

    expect(eventLog).to.deep.equal(['mouseleave']);
  });

  it('is dismissible by pressing Escape', () => {
    const handleClose = spy();
    const transitionTimeout = 0;
    render(
      <Tooltip
        enterDelay={0}
        onClose={handleClose}
        open
        TransitionProps={{ timeout: transitionTimeout }}
        title="Movie quote"
      >
        <button />
      </Tooltip>,
    );

    fireEvent.keyDown(
      // We don't care about the target. Any Escape should dismiss the tooltip
      // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
      document.activeElement,
      { key: 'Escape' },
    );
    clock.tick(transitionTimeout);

    expect(handleClose.callCount).to.equal(1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      fireEvent.touchStart(screen.getByRole('button'));
      fireEvent.touchEnd(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should open on long press', async () => {
      const enterTouchDelay = 700;
      const enterDelay = 100;
      const leaveTouchDelay = 1500;
      const transitionTimeout = 10;
      render(
        <Tooltip
          enterTouchDelay={enterTouchDelay}
          enterDelay={enterDelay}
          leaveTouchDelay={leaveTouchDelay}
          title="Hello World"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      fireEvent.touchStart(screen.getByRole('button'));
      clock.tick(enterTouchDelay + enterDelay);

      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.touchEnd(screen.getByRole('button'));
      await act(async () => {
        screen.getByRole('button').blur();
      });
      clock.tick(leaveTouchDelay);
      clock.tick(transitionTimeout);

      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('should not open if disableTouchListener', () => {
      render(
        <Tooltip title="Hello World" disableTouchListener>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.touchStart(screen.getByRole('button'));
      fireEvent.mouseOver(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).to.equal(null);
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

    it('should handle autoFocus + onFocus forwarding', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }

      const handleFocus = spy();
      function AutoFocus(props) {
        return (
          <div>
            {props.open ? (
              <Tooltip enterDelay={100} title="Title">
                <input autoFocus onFocus={handleFocus} />
              </Tooltip>
            ) : null}
          </div>
        );
      }

      const { setProps } = render(
        <AutoFocus />,
        // TODO: https://github.com/reactwg/react-18/discussions/18#discussioncomment-893076
        { strictEffects: false },
      );

      setProps({ open: true });
      clock.tick(100);

      expect(screen.getByRole('tooltip')).toBeVisible();
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('prop: delay', () => {
    before(function beforeCallback() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }
    });

    it('should take the enterDelay into account', async () => {
      const { queryByRole } = render(
        <Tooltip title="Hello World" enterDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      simulatePointerDevice();

      focusVisible(screen.getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);

      clock.tick(111);

      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should use hysteresis with the enterDelay', async () => {
      render(
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
      const children = screen.getByRole('button');
      focusVisible(children);

      expect(screen.queryByRole('tooltip')).to.equal(null);

      clock.tick(111);

      expect(screen.getByRole('tooltip')).toBeVisible();

      await act(async () => {
        document.activeElement.blur();
      });
      clock.tick(5);
      clock.tick(6);

      expect(screen.queryByRole('tooltip')).to.equal(null);

      focusVisible(children);
      // Bypass `enterDelay` wait, use `enterNextDelay`.
      expect(screen.queryByRole('tooltip')).to.equal(null);

      await act(async () => {
        clock.tick(30);
      });

      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('should take the leaveDelay into account', async () => {
      const leaveDelay = 111;
      const enterDelay = 0;
      const transitionTimeout = 10;
      render(
        <Tooltip
          leaveDelay={leaveDelay}
          enterDelay={enterDelay}
          title="tooltip"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      simulatePointerDevice();

      focusVisible(screen.getByRole('button'));
      clock.tick(enterDelay);

      expect(screen.getByRole('tooltip')).toBeVisible();

      await act(async () => {
        screen.getByRole('button').blur();
      });

      expect(screen.getByRole('tooltip')).toBeVisible();

      clock.tick(leaveDelay);
      clock.tick(transitionTimeout);

      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: overrides', () => {
    [
      'onTouchStart',
      'onTouchEnd',
      'onMouseEnter',
      'onMouseMove',
      'onMouseOver',
      'onMouseLeave',
    ].forEach((name) => {
      it(`should be transparent for the ${name} event`, () => {
        const handler = spy();
        render(
          <Tooltip followCursor title="Hello World">
            <button id="testChild" type="submit" {...{ [name]: handler }}>
              Hello World
            </button>
          </Tooltip>,
        );
        const type = camelCase(name.slice(2));
        fireEvent[type](screen.getByRole('button'));
        expect(handler.callCount).to.equal(1, `${name} should've been called`);
      });
    });

    it(`should be transparent for the focus and blur event`, async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }

      const handleBlur = spy();
      const handleFocus = spy();
      render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit" onFocus={handleFocus} onBlur={handleBlur}>
            Hello World
          </button>
        </Tooltip>,
      );
      const button = screen.getByRole('button');

      await act(async () => {
        button.focus();
      });

      expect(handleBlur.callCount).to.equal(0);
      expect(handleFocus.callCount).to.equal(1);

      await act(async () => {
        button.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(1);
    });

    it('should ignore event from the tooltip', () => {
      const handleMouseOver = spy();
      render(
        <Tooltip title="Hello World" open>
          <button type="submit" onMouseOver={handleMouseOver}>
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('tooltip'));

      expect(handleMouseOver.callCount).to.equal(0);
    });
  });

  describe('disabled button warning', () => {
    it('should not raise a warning if title is empty', () => {
      expect(() => {
        render(
          <Tooltip title="">
            <button type="submit" disabled>
              Hello World
            </button>
          </Tooltip>,
        );
      }).not.toErrorDev();
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      expect(() => {
        render(
          <Tooltip title="Hello World">
            <button type="submit" disabled>
              Hello World
            </button>
          </Tooltip>,
        );
      }).toErrorDev('MUI: You are providing a disabled `button` child to the Tooltip component');
    });

    it('should not raise a warning when we are controlled', () => {
      expect(() => {
        render(
          <Tooltip title="Hello World" open>
            <button type="submit" disabled>
              Hello World
            </button>
          </Tooltip>,
        );
      }).not.toErrorDev();
    });
  });

  describe('prop: disableInteractive', () => {
    it('when false should keep the overlay open if the popper element is hovered', () => {
      render(
        <Tooltip
          title="Hello World"
          enterDelay={100}
          leaveDelay={111}
          TransitionProps={{ timeout: 10 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      clock.tick(100);

      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(screen.getByRole('button'));

      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseOver(screen.getByRole('tooltip'));
      clock.tick(111 + 10);

      expect(screen.getByRole('tooltip')).toBeVisible();
    });

    it('when `true` should not keep the overlay open if the popper element is hovered', () => {
      render(
        <Tooltip
          title="Hello World"
          enterDelay={100}
          leaveDelay={111}
          TransitionProps={{ timeout: 10 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(screen.getByRole('button'));
      clock.tick(100);

      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(screen.getByRole('button'));

      expect(screen.getByRole('tooltip')).toBeVisible();

      fireEvent.mouseOver(screen.getByRole('tooltip'));
      clock.tick(111 + 10);

      expect(screen.getByRole('tooltip')).not.toBeVisible();
    });
  });

  describe('prop: PopperProps', () => {
    it('should pass PopperProps to Popper Component', () => {
      render(
        <Tooltip title="Hello World" open PopperProps={{ 'data-testid': 'popper' }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('popper')).not.to.equal(null);
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
              modifiers: [
                {
                  name: 'arrow',
                  options: {
                    padding: 8,
                  },
                },
              ],
            },
          }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const appliedArrowModifier = popperRef.current.state.orderedModifiers.find(
        (modifier) => modifier.name === 'arrow',
      );

      expect(appliedArrowModifier).not.to.equal(undefined);
      expect(appliedArrowModifier.enabled).to.equal(true);
      expect(appliedArrowModifier.options.padding).to.equal(8);
    });

    it('should merge popperOptions with custom modifier', () => {
      const popperRef = React.createRef();
      render(
        <Tooltip
          title="Hello World"
          open
          arrow
          PopperProps={{
            popperRef,
            popperOptions: {
              modifiers: [
                {
                  name: 'foo',
                  enabled: true,
                  phase: 'main',
                  fn: () => {},
                },
              ],
            },
          }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const appliedComputeStylesModifier = popperRef.current.state.orderedModifiers.find(
        (modifier) => modifier.name === 'foo',
      );

      expect(appliedComputeStylesModifier).not.to.equal(undefined);
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
    before(function beforeCallback() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }
    });

    it('ignores base focus', async () => {
      render(
        <Tooltip enterDelay={0} title="Some information">
          <button />
        </Tooltip>,
      );
      simulatePointerDevice();

      expect(screen.queryByRole('tooltip')).to.equal(null);

      await act(async () => {
        screen.getByRole('button').focus();
      });

      if (programmaticFocusTriggersFocusVisible()) {
        expect(screen.queryByRole('tooltip')).not.to.equal(null);
      } else {
        expect(screen.queryByRole('tooltip')).to.equal(null);
      }
    });

    it('opens on focus-visible', () => {
      const eventLog = [];
      render(
        <Tooltip enterDelay={0} onOpen={() => eventLog.push('open')} title="Some information">
          <button onFocus={() => eventLog.push('focus')} />
        </Tooltip>,
      );
      simulatePointerDevice();

      expect(screen.queryByRole('tooltip')).to.equal(null);

      focusVisible(screen.getByRole('button'));

      expect(screen.getByRole('tooltip')).toBeVisible();
      expect(eventLog).to.deep.equal(['focus', 'open']);
    });

    it('closes on blur', async () => {
      const eventLog = [];
      const transitionTimeout = 0;
      render(
        <Tooltip
          enterDelay={0}
          leaveDelay={0}
          onClose={() => eventLog.push('close')}
          open
          title="Some information"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button onBlur={() => eventLog.push('blur')} />
        </Tooltip>,
      );
      const button = screen.getByRole('button');

      await act(async () => {
        button.focus();
      });
      await act(async () => {
        button.blur();
      });
      clock.tick(transitionTimeout);

      expect(screen.getByRole('tooltip')).toBeVisible();
      expect(eventLog).to.deep.equal(['blur', 'close']);
    });

    // https://github.com/mui/material-ui/issues/19883
    it('should not prevent event handlers of children', async () => {
      const handleFocus = spy((event) => event.currentTarget);
      // Tooltip should not assume that event handlers of children are attached to the
      // outermost host
      const TextField = React.forwardRef(function TextField(props, ref) {
        const { onFocus, ...other } = props;
        return (
          <div ref={ref} {...other}>
            <input type="text" onFocus={onFocus} />
          </div>
        );
      });
      render(
        <Tooltip open title="test">
          <TextField onFocus={handleFocus} variant="standard" />
        </Tooltip>,
      );
      const input = screen.getByRole('textbox');

      await act(async () => {
        input.focus();
      });

      // return value is event.currentTarget
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocus.returned(input)).to.equal(true);
    });

    // https://github.com/mui/mui-x/issues/12248
    it('should support event handlers with extra parameters', async () => {
      const handleFocus = spy((event, extra) => extra);
      const handleBlur = spy((event, ...params) => params);

      const TextField = React.forwardRef(function TextField(props, ref) {
        const { onFocus, onBlur, ...other } = props;
        return (
          <div ref={ref} {...other}>
            <input
              type="text"
              onFocus={(event) => onFocus(event, 'focus')}
              onBlur={(event) => onBlur(event, 'blur', 1)}
            />
          </div>
        );
      });
      render(
        <Tooltip open title="test">
          <TextField onFocus={handleFocus} onBlur={handleBlur} variant="standard" />
        </Tooltip>,
      );
      const input = screen.getByRole('textbox');

      await act(async () => {
        input.focus();
      });

      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocus.returnValues[0]).to.equal('focus');

      await act(async () => {
        input.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleBlur.returnValues[0]).to.deep.equal(['blur', 1]);
    });
  });

  describe('warnings', () => {
    it('should warn when switching between uncontrolled to controlled', () => {
      const { setProps } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      expect(() => {
        setProps({ open: true });
      }).toErrorDev(
        'MUI: A component is changing the uncontrolled open state of Tooltip to be controlled.',
      );
    });

    it('should warn when not forwarding props', () => {
      const BrokenButton = React.forwardRef((props, ref) => <button ref={ref}>Hello World</button>);

      expect(() => {
        render(
          <Tooltip title="Hello World">
            <BrokenButton />
          </Tooltip>,
        );
      }).toErrorDev(
        'The `children` component of the Tooltip is not forwarding its props correctly.',
      );
    });

    it('should warn when children is a string', function test() {
      if (reactMajor >= 19) {
        // React 19 removed prop types support
        this.skip();
      }

      expect(() => {
        render(<Tooltip title="Hello World">Hello World</Tooltip>);
      }).toErrorDev('Invalid prop `children` of type `string` supplied');
    });
  });

  it('should use the same Popper.js instance between two renders', () => {
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
      function CustomPopper() {
        return <div data-testid="CustomPopper" />;
      }
      render(
        <Tooltip title="Hello World" open PopperComponent={CustomPopper}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomPopper')).toBeVisible();
    });
  });

  describe('prop: followCursor', () => {
    it('should use the position of the mouse', async function test() {
      const x = 50;
      const y = 10;

      render(
        <Tooltip
          title="Hello World"
          placement="bottom-end"
          open
          followCursor
          PopperProps={{ 'data-testid': 'popper' }}
        >
          <button data-testid="target" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      const tooltipElement = screen.getByTestId('popper');
      const targetElement = screen.getByTestId('target');

      fireEvent.mouseMove(targetElement, {
        clientX: x,
        clientY: y,
      });

      // The `placement` of the Popper changed due to the previous action.
      // Updates to the Popper are scheduled in a microtask (at least in the implementation of `@popperjs/core`) so we need to flush that microtask by awaiting a Promise.
      await act(async () => {
        await Promise.resolve();
      });

      expect(tooltipElement).toBeVisible();

      // Layer acceleration can disable subpixel rendering which causes slightly
      // blurry text on low PPI displays, so we want to use 2D transforms
      // instead
      if ((window.devicePixelRatio || 1) < 2) {
        expect(tooltipElement).to.have.toHaveInlineStyle({
          transform: `translate(${x}px, ${y}px)`,
        });
      } else {
        expect(tooltipElement).to.have.toHaveInlineStyle({
          transform: `translate3d(${x}px, ${y}px, 0px)`,
        });
      }
    });
  });

  describe('prop: components', () => {
    it('can render a different Popper component', () => {
      function CustomPopper() {
        return <div data-testid="CustomPopper" />;
      }
      render(
        <Tooltip title="Hello World" open components={{ Popper: CustomPopper }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomPopper')).toBeVisible();
    });

    it('can render a different Tooltip component', () => {
      const CustomTooltip = React.forwardRef((props, ref) => (
        <div data-testid="CustomTooltip" ref={ref} />
      ));
      render(
        <Tooltip title="Hello World" open components={{ Tooltip: CustomTooltip }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomTooltip')).toBeVisible();
    });

    it('can render a different Arrow component', () => {
      const CustomArrow = React.forwardRef((props, ref) => (
        <div data-testid="CustomArrow" ref={ref} />
      ));
      render(
        <Tooltip title="Hello World" open arrow components={{ Arrow: CustomArrow }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomArrow')).toBeVisible();
    });
  });

  describe('prop: componentsProps', () => {
    it('can provide custom props for the inner Popper component', () => {
      render(
        <Tooltip
          title="Hello World"
          open
          componentsProps={{ popper: { 'data-testid': 'CustomPopper' } }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomPopper')).toBeVisible();
    });

    it('can provide custom props for the inner Tooltip component', () => {
      render(
        <Tooltip
          title="Hello World"
          open
          componentsProps={{ tooltip: { 'data-testid': 'CustomTooltip' } }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomTooltip')).toBeVisible();
    });

    it('can provide custom props for the inner Arrow component', () => {
      render(
        <Tooltip
          title="Hello World"
          open
          arrow
          componentsProps={{ arrow: { 'data-testid': 'CustomArrow' } }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(screen.getByTestId('CustomArrow')).toBeVisible();
    });
  });

  describe('user-select state', () => {
    let prevWebkitUserSelect;

    beforeEach(() => {
      prevWebkitUserSelect = document.body.style.WebkitUserSelect;
    });

    afterEach(() => {
      document.body.style.WebkitUserSelect = prevWebkitUserSelect;
    });

    it('prevents text-selection during touch-longpress', () => {
      const enterTouchDelay = 700;
      const enterDelay = 100;
      const leaveTouchDelay = 1500;
      const transitionTimeout = 10;
      render(
        <Tooltip
          enterTouchDelay={enterTouchDelay}
          enterDelay={enterDelay}
          leaveTouchDelay={leaveTouchDelay}
          title="Hello World"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      document.body.style.WebkitUserSelect = 'text';

      fireEvent.touchStart(screen.getByRole('button'));

      expect(document.body.style.WebkitUserSelect).to.equal('none');

      clock.tick(enterTouchDelay + enterDelay);
      expect(document.body.style.WebkitUserSelect).to.equal('text');
    });

    it('ensures text-selection is reset after single press', () => {
      render(
        <Tooltip title="Hello World">
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      document.body.style.WebkitUserSelect = 'text';

      fireEvent.touchStart(screen.getByRole('button'));
      expect(document.body.style.WebkitUserSelect).to.equal('none');

      fireEvent.touchEnd(screen.getByRole('button'));
      expect(document.body.style.WebkitUserSelect).to.equal('text');
    });

    it('restores user-select when unmounted during longpress', () => {
      const enterTouchDelay = 700;
      const enterDelay = 100;
      const leaveTouchDelay = 1500;
      const transitionTimeout = 10;
      const { unmount } = render(
        <Tooltip
          enterTouchDelay={enterTouchDelay}
          enterDelay={enterDelay}
          leaveTouchDelay={leaveTouchDelay}
          title="Hello World"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      document.body.style.WebkitUserSelect = 'text';
      // Let updates flush before unmounting
      fireEvent.touchStart(screen.getByRole('button'));
      unmount();

      expect(document.body.style.WebkitUserSelect).to.equal('text');
    });
  });

  describe('className', () => {
    it('should allow className from PopperProps', () => {
      render(
        <Tooltip
          title="Hello World"
          open
          PopperProps={{ 'data-testid': 'popper', className: 'my-class' }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      expect(screen.getByTestId('popper')).to.have.class('my-class');
    });

    it('should allow className from componentsProps.popper', () => {
      render(
        <Tooltip
          title="Hello World"
          open
          componentsProps={{ popper: { 'data-testid': 'popper', className: 'my-class' } }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      expect(screen.getByTestId('popper')).to.have.class('my-class');
    });

    it('should apply both the className from PopperProps and componentsProps.popper if both are passed', () => {
      render(
        <Tooltip
          title="Hello World"
          open
          componentsProps={{ popper: { 'data-testid': 'popper', className: 'my-class' } }}
          PopperProps={{ className: 'my-class-2' }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      expect(screen.getByTestId('popper')).to.have.class('my-class-2');
      expect(screen.getByTestId('popper')).to.have.class('my-class');
    });
  });
});
