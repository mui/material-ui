import * as React from 'react';
import { expect } from 'chai';
import {
  act,
  createRenderer,
  createMount,
  describeConformanceUnstyled,
  screen,
  fireEvent,
} from '@mui-internal/test-utils';
import {
  Unstable_Popup as Popup,
  popupClasses,
  PopupProps,
  PopupChildrenProps,
} from '@mui/base/Unstable_Popup';

type FakeTransitionProps = Omit<PopupChildrenProps, 'placement'> & {
  children: React.ReactNode;
};

const TRANSITION_DURATION = 100;

function FakeTransition(props: FakeTransitionProps) {
  const { children: transitionChildren, requestOpen, onExited, onEnter } = props;

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (requestOpen) {
      onEnter();
    } else {
      timeoutId = setTimeout(() => {
        act(() => onExited());
      }, TRANSITION_DURATION);
    }

    return () => {
      if (timeoutId !== null) {
        onExited();
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [requestOpen, onExited, onEnter]);

  return <div>{transitionChildren}</div>;
}

describe('<Popup />', () => {
  const { clock, render } = createRenderer();
  const mount = createMount();

  // https://floating-ui.com/docs/react#testing
  async function waitForPosition() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // This is only needed for JSDOM and causes issues in real browsers
      await act(() => async () => {});
    }
  }

  const defaultProps: PopupProps = {
    anchor: () => document.createElement('div'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformanceUnstyled(<Popup {...defaultProps} />, () => ({
    inheritComponent: 'div',
    render: async (...renderArgs) => {
      const result = render(...renderArgs);
      await waitForPosition();

      return result;
    },
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
      'componentProp',
    ],
    slots: {
      root: {
        expectedClassName: popupClasses.root,
      },
    },
  }));

  describe('prop: placement', () => {
    it('should have top placement', async () => {
      render(
        <Popup {...defaultProps} placement="top">
          {({ placement }: PopupChildrenProps) => {
            return <span data-testid="renderSpy" data-placement={placement} />;
          }}
        </Popup>,
      );

      await waitForPosition();

      expect(screen.getByTestId('renderSpy')).to.have.attribute('data-placement', 'top');
    });

    it('should respect the RTL setting', async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      function RtlTest() {
        const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
        const [isRtl, setIsRtl] = React.useState(false);

        const handleClick = () => {
          setIsRtl((rtl) => !rtl);
        };

        return (
          <div dir={isRtl ? 'rtl' : undefined}>
            <div
              tabIndex={0}
              role="button"
              ref={setAnchor}
              style={{ width: '200px' }}
              onClick={handleClick}
            >
              Anchor
            </div>
            <Popup anchor={anchor} open placement="top-start" disablePortal>
              <div style={{ width: '50px', overflow: 'hidden' }}>Popup</div>
            </Popup>
          </div>
        );
      }

      render(<RtlTest />);
      await waitForPosition();

      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });

      const anchor = screen.getByRole('button')!;
      const popup = screen.getByRole('tooltip')!;

      expect(popup.getBoundingClientRect().left).to.equal(anchor.getBoundingClientRect().left);
      expect(popup.getBoundingClientRect().right).not.to.equal(
        anchor.getBoundingClientRect().right,
      );

      act(() => {
        anchor.click();
      });

      await waitForPosition();
      expect(popup.getBoundingClientRect().right).to.equal(popup.getBoundingClientRect().right);
      expect(popup.getBoundingClientRect().left).not.to.equal(anchor.getBoundingClientRect().left);
    });

    it('should flip placement when edge is reached', async function test() {
      // JSDOM has no layout engine so PopperJS doesn't know that it should flip the placement.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      function FlipTest() {
        const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
        const containerRef = React.useRef<HTMLDivElement>(null);

        const handleClick = () => {
          containerRef.current!.scrollTop = 30;
        };

        return (
          <div
            style={{ height: '100px', overflow: 'scroll', position: 'relative' }}
            ref={containerRef}
          >
            <div style={{ height: '100px', padding: '20px' }}>
              <button type="button" ref={setAnchor} onClick={handleClick}>
                Scroll
              </button>
              <Popup anchor={anchor} open placement="top" disablePortal>
                {({ placement }: PopupChildrenProps) => <span>{placement}</span>}
              </Popup>
            </div>
          </div>
        );
      }

      render(<FlipTest />);
      expect(screen.getByRole('tooltip')).to.have.text('top');

      act(() => screen.getByRole('button').click());

      // wait for the scroll event to trigger the update
      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });

      expect(screen.getByRole('tooltip')).to.have.text('bottom');
    });
  });

  describe('prop: open', () => {
    it('should open without any issues', async () => {
      const { queryByRole, getByRole, setProps } = render(<Popup {...defaultProps} open={false} />);

      await waitForPosition();
      expect(queryByRole('tooltip')).to.equal(null);

      setProps({ open: true });
      await waitForPosition();
      expect(getByRole('tooltip')).to.have.text('Hello World');
    });

    it('should close without any issues', async () => {
      const { queryByRole, getByRole, setProps } = render(<Popup {...defaultProps} />);

      await waitForPosition();
      expect(getByRole('tooltip')).to.have.text('Hello World');

      setProps({ open: false });
      await waitForPosition();
      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children mounted in the DOM', async () => {
      render(<Popup {...defaultProps} keepMounted open={false} />);
      await waitForPosition();

      const tooltip = document.querySelector('[role="tooltip"]') as HTMLElement;
      expect(tooltip).to.have.text('Hello World');
      expect(tooltip.style.display).to.equal('none');
    });
  });

  describe('prop: withTransition', () => {
    clock.withFakeTimers();

    it('should work', async () => {
      const { queryByRole, getByRole, setProps } = render(
        <Popup {...defaultProps} withTransition>
          {({ requestOpen, onExited, onEnter }: PopupChildrenProps) => (
            <FakeTransition requestOpen={requestOpen} onExited={onExited} onEnter={onEnter}>
              <span>Hello World</span>
            </FakeTransition>
          )}
        </Popup>,
      );

      await waitForPosition();
      expect(getByRole('tooltip')).to.have.text('Hello World');

      setProps({ open: false });
      await waitForPosition();
      clock.tick(TRANSITION_DURATION);

      expect(queryByRole('tooltip')).to.equal(null);
    });

    // Test case for https://github.com/mui/material-ui/issues/15180
    it('should remove the transition children in the DOM when closed whilst transition status is entering', async () => {
      class OpenClose extends React.Component {
        state = {
          open: false,
        };

        handleClick = () => {
          this.setState({ open: true }, () => {
            this.setState({ open: false });
          });
        };

        render() {
          return (
            <div>
              <button type="button" onClick={this.handleClick}>
                Toggle Tooltip
              </button>
              <Popup {...defaultProps} open={this.state.open} withTransition>
                {({ requestOpen, onExited, onEnter }: PopupChildrenProps) => (
                  <FakeTransition requestOpen={requestOpen} onExited={onExited} onEnter={onEnter}>
                    <p>Hello World</p>
                  </FakeTransition>
                )}
              </Popup>
            </div>
          );
        }
      }

      const { getByRole } = render(<OpenClose />);
      await waitForPosition();
      expect(document.querySelector('p')).to.equal(null);

      fireEvent.click(getByRole('button'));
      await waitForPosition();
      expect(document.querySelector('p')).to.equal(null);
    });
  });

  describe('prop: disablePortal', () => {
    it('when enabled, should render the popup where is is defined', async () => {
      const { getByRole, getByTestId } = render(
        <div data-testid="parent">
          <Popup {...defaultProps} disablePortal />
        </div>,
      );

      await waitForPosition();

      const tooltip = getByRole('tooltip');
      const parent = getByTestId('parent');

      // renders
      expect(tooltip.parentNode).to.equal(parent);
    });

    it('by default, should render the popup in a portal appended to the body element', async () => {
      const { getByRole } = render(
        <div data-testid="parent">
          <Popup {...defaultProps} />
        </div>,
      );

      await waitForPosition();

      const tooltip = getByRole('tooltip');
      expect(tooltip.parentNode).to.equal(document.body);
    });
  });

  describe('display', () => {
    clock.withFakeTimers();

    it('should keep display:none when not toggled and transition/keepMounted/disablePortal props are set', async () => {
      const { getByRole, setProps } = render(
        <Popup {...defaultProps} open={false} keepMounted withTransition disablePortal>
          {({ requestOpen, onExited, onEnter }: PopupChildrenProps) => (
            <FakeTransition requestOpen={requestOpen} onExited={onExited} onEnter={onEnter}>
              <span>Hello World</span>
            </FakeTransition>
          )}
        </Popup>,
      );

      await waitForPosition();
      expect(getByRole('tooltip', { hidden: true }).style.display).to.equal('none');

      setProps({ open: true });
      await waitForPosition();
      clock.tick(TRANSITION_DURATION);

      setProps({ open: false });
      await waitForPosition();
      clock.tick(TRANSITION_DURATION);
      expect(getByRole('tooltip', { hidden: true }).style.display).to.equal('none');
    });
  });
});
