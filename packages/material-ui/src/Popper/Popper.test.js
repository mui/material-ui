import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import { createMount, describeConformance, act, createClientRender, fireEvent } from 'test/utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PopperJs from 'popper.js';
import Grow from '../Grow';
import Popper from './Popper';

describe('<Popper />', () => {
  const mount = createMount({ strict: true });
  let rtlTheme;
  const render = createClientRender();
  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  before(() => {
    rtlTheme = createMuiTheme({
      direction: 'rtl',
    });
  });

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
        <ThemeProvider theme={rtlTheme}>
          <Popper {...defaultProps} placement="top">
            {({ placement }) => {
              renderSpy(placement);
              return null;
            }}
          </Popper>
        </ThemeProvider>,
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
      it(`should flip ${test.in} when direction=rtl is used`, () => {
        const renderSpy = spy();
        render(
          <ThemeProvider theme={rtlTheme}>
            <Popper {...defaultProps} placement={test.in}>
              {({ placement }) => {
                renderSpy(placement);
                return null;
              }}
            </Popper>
            ,
          </ThemeProvider>,
        );
        expect(renderSpy.callCount).to.equal(2);
        expect(renderSpy.args[0][0]).to.equal(test.out);
      });
    });

    it('should flip placement when edge is reached', () => {
      const renderSpy = spy();
      const popperRef = React.createRef();
      const { unmount } = render(
        <ThemeProvider theme={rtlTheme}>
          <Popper popperRef={popperRef} {...defaultProps} placement="bottom">
            {({ placement }) => {
              renderSpy(placement);
              return null;
            }}
          </Popper>
          ,
        </ThemeProvider>,
      );
      expect(renderSpy.args).to.deep.equal([['bottom'], ['bottom']]);

      act(() => {
        popperRef.current.options.onUpdate({
          placement: 'top',
        });
      });

      expect(renderSpy.args).to.deep.equal([['bottom'], ['bottom'], ['top'], ['top']]);

      // FIXME: Unclear why we need this to fix "missing act()"-warning
      unmount();
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
    it('should pass all popperOptions to popperjs', (done) => {
      const popperOptions = {
        onCreate: (data) => {
          data.instance.update({ placement: 'left' });
        },
        onUpdate: () => {
          done();
        },
      };
      render(<Popper {...defaultProps} popperOptions={popperOptions} placement="top" open />);
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
    let clock;
    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

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
      expect(ref1.current instanceof PopperJs).to.equal(true);
      setProps({
        popperRef: ref2,
      });
      expect(ref1.current).to.equal(null);
      expect(ref2.current instanceof PopperJs).to.equal(true);
    });
  });

  describe('prop: disablePortal', () => {
    it('should work', () => {
      const popperRef = React.createRef();
      const { getByRole } = render(
        <Popper {...defaultProps} disablePortal popperRef={popperRef} />,
      );
      // renders
      expect(getByRole('tooltip')).to.not.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.options.modifiers.preventOverflow.boundariesElement).to.equal(
        'scrollParent',
      );
    });

    it('sets preventOverflow to window when disablePortal is false', () => {
      const popperRef = React.createRef();
      const { getByRole } = render(<Popper {...defaultProps} popperRef={popperRef} />);
      // renders
      expect(getByRole('tooltip')).to.not.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.options.modifiers.preventOverflow.boundariesElement).to.equal(
        'window',
      );
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
