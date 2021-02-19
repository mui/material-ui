import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import {
  createMount,
  describeConformance,
  act,
  createClientRender,
  fireEvent,
  screen,
} from 'test/utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grow from '../Grow';
import Popper from './Popper';

/**
 * Await this call whenever you scheduled an update to the @popperjs/core instance.
 * @param {React.RefObject<import('@popperjs/core').Instance>} popperRef
 */
async function flushPopperUpdate(popperRef) {
  await act(async () => {
    await popperRef.current.update();
  });
}

describe('<Popper />', () => {
  const mount = createMount({ strict: true });
  const render = createClientRender();
  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformance(<Popper {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
    ],
  }));

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const renderSpy = spy();
      render(
        <Popper {...defaultProps} placement="top">
          {({ placement }) => {
            renderSpy(placement);
            return null;
          }}
        </Popper>,
      );
      expect(renderSpy.callCount).to.equal(2); // strict mode renders twice
      expect(renderSpy.args[0][0]).to.equal('top');
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
      it.only(`should ${test.in === test.out ? 'not' : ''}flip ${
        test.in
      } when direction=rtl is used`, async () => {
        const rtlTheme = createMuiTheme({
          direction: 'rtl',
        });

        const popperRef = React.createRef();
        render(
          <ThemeProvider theme={rtlTheme}>
            <Popper {...defaultProps} placement={test.in} popperRef={popperRef}>
              {({ placement }) => {
                return <div data-testid="placement">{placement}</div>;
              }}
            </Popper>
            ,
          </ThemeProvider>,
        );
        await flushPopperUpdate(popperRef);

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

      await act(async () => {
        await popperRef.current.setOptions({ placement: 'top' });
      });

      expect(screen.getByTestId('placement')).to.have.text('bottom');
    });
  });

  describe('prop: open', () => {
    it.only('should open without any issue', async () => {
      const popperRef = React.createRef();
      const { queryByRole, getByRole, setProps } = render(
        <Popper {...defaultProps} open={false} popperRef={popperRef} />,
      );
      expect(queryByRole('tooltip')).to.equal(null);

      setProps({ open: true });
      await flushPopperUpdate(popperRef);

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
      // Test case for https://github.com/mui-org/material-ui/issues/15180
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
      act(() => {
        clock.tick(0);
      });

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

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should warn if anchorEl is not valid', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Popper.propTypes,
          {
            ...defaultProps,
            open: true,
            anchorEl: null,
          },
          'prop',
          'MockedPopper',
        );
      }).toErrorDev('It should be an HTML element instance');
    });
  });
});
