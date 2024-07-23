import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/system';
import createTheme from '@mui/system/createTheme';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import describeConformance from '../../test/describeConformance';

describe('<Popper />', () => {
  let rtlTheme;
  const { clock, render } = createRenderer({ clock: 'fake' });
  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  before(() => {
    rtlTheme = createTheme({
      direction: 'rtl',
    });
  });

  describeConformance(<Popper {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testLegacyComponentsProp: true,
    slots: {
      root: {},
    },
    skip: [
      'componentProp',
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
      'slotPropsCallback', // not supported yet
    ],
  }));

  describe('prop: placement', () => {
    it('should have top placement', () => {
      render(
        <Popper {...defaultProps} placement="top">
          {({ placement }) => {
            return <span data-testid="renderSpy" data-placement={placement} />;
          }}
        </Popper>,
      );

      expect(screen.getByTestId('renderSpy')).to.have.attribute('data-placement', 'top');
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
    ].forEach((test) => {
      it(`should ${test.in === test.out ? 'not ' : ''}flip ${
        test.in
      } when direction=rtl is used`, () => {
        function Test() {
          const [anchorEl, setAnchorEl] = React.useState(null);

          return (
            <ThemeProvider theme={rtlTheme}>
              <div style={{ margin: '5em' }} ref={setAnchorEl} />
              <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement={test.in}>
                {({ placement }) => {
                  return <div data-testid="placement">{placement}</div>;
                }}
              </Popper>
            </ThemeProvider>
          );
        }
        render(<Test />);

        expect(screen.getByTestId('placement')).to.have.text(test.out);
      });
    });

    it('should flip placement when edge is reached', async function test() {
      // JSDOM has no layout engine so PopperJS doesn't know that it should flip the placement.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const popperRef = React.createRef();
      render(
        <Popper popperRef={popperRef} {...defaultProps} placement="bottom">
          {({ placement }) => {
            return <div data-testid="placement">{placement}</div>;
          }}
        </Popper>,
      );
      expect(screen.getByTestId('placement')).to.have.text('bottom');

      await popperRef.current.setOptions({ placement: 'top' });

      expect(screen.getByTestId('placement')).to.have.text('bottom');
    });
  });

  describe('prop: open', () => {
    it('should open without any issue', () => {
      const { queryByRole, getByRole, setProps } = render(
        <Popper {...defaultProps} open={false} />,
      );
      expect(queryByRole('tooltip')).to.equal(null);
      setProps({ open: true });
      expect(getByRole('tooltip')).to.have.text('Hello World');
    });

    it('should close without any issue', () => {
      const { queryByRole, getByRole, setProps } = render(<Popper {...defaultProps} />);
      expect(getByRole('tooltip')).to.have.text('Hello World');
      setProps({ open: false });
      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: popperOptions', () => {
    it('should pass all popperOptions to popperjs', () => {
      const popperRef = React.createRef();
      const { setProps } = render(
        <Popper {...defaultProps} popperRef={popperRef} placement="top" open />,
      );

      setProps({
        popperOptions: {
          placement: 'bottom',
        },
      });

      expect(popperRef.current.state.placement).to.equal('bottom');
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children mounted in the DOM', () => {
      render(<Popper {...defaultProps} keepMounted open={false} />);
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).to.have.text('Hello World');
      expect(tooltip.style.display).to.equal('none');
    });

    describe('by default', () => {
      // Test case for https://github.com/mui/material-ui/issues/15180
      it('should remove the transition children in the DOM when closed whilst transition status is entering', () => {
        const children = <p>Hello World</p>;

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
                <Popper {...defaultProps} open={this.state.open} transition>
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <span>{children}</span>
                    </Grow>
                  )}
                </Popper>
              </div>
            );
          }
        }

        const { getByRole } = render(<OpenClose />);
        expect(document.querySelector('p')).to.equal(null);
        fireEvent.click(getByRole('button'));
        expect(document.querySelector('p')).to.equal(null);
      });
    });
  });

  describe('prop: transition', () => {
    clock.withFakeTimers();

    it('should work', () => {
      const { queryByRole, getByRole, setProps } = render(
        <Popper {...defaultProps} transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );

      expect(getByRole('tooltip')).to.have.text('Hello World');

      setProps({ anchorEl: null, open: false });
      clock.tick(0);

      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: popperRef', () => {
    it('should return a ref', () => {
      const ref1 = React.createRef();
      const ref2 = React.createRef();
      const { setProps } = render(<Popper {...defaultProps} popperRef={ref1} />);
      expect(ref1.current).not.to.equal(null);
      setProps({
        popperRef: ref2,
      });
      expect(ref1.current).to.equal(null);
      expect(ref2.current).not.to.equal(null);
    });
  });

  describe('prop: disablePortal', () => {
    it('should work', () => {
      const popperRef = React.createRef();
      const { getByRole } = render(
        <Popper {...defaultProps} disablePortal popperRef={popperRef} />,
      );
      // renders
      expect(getByRole('tooltip')).not.to.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.state.options.modifiers[0].options.altBoundary).to.equal(true);
    });

    it('sets preventOverflow altBoundary to false when disablePortal is false', () => {
      const popperRef = React.createRef();
      const { getByRole } = render(<Popper {...defaultProps} popperRef={popperRef} />);
      // renders
      expect(getByRole('tooltip')).not.to.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.state.options.modifiers[0].options.altBoundary).to.equal(false);
    });
  });

  describe('display', () => {
    clock.withFakeTimers();

    it('should keep display:none when not toggled and transition/keepMounted/disablePortal props are set', () => {
      const { getByRole, setProps } = render(
        <Popper {...defaultProps} open={false} keepMounted transition disablePortal>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );

      expect(getByRole('tooltip', { hidden: true }).style.display).to.equal('none');

      setProps({ open: true });
      clock.tick(0);

      setProps({ open: false });
      clock.tick(0);
      expect(getByRole('tooltip', { hidden: true }).style.display).to.equal('none');
    });
  });

  describe('default props', () => {
    it('should consume theme default props', () => {
      const container = document.createElement('div');
      const theme = createTheme({ components: { MuiPopper: { defaultProps: { container } } } });
      render(
        <ThemeProvider theme={theme}>
          <Popper {...defaultProps} open>
            <p id="content">Hello World</p>
          </Popper>
        </ThemeProvider>,
      );

      expect(container).to.have.text('Hello World');
    });
  });
});
