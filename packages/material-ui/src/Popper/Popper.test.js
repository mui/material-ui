import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import PopperJs from 'popper.js';
import Grow from '../Grow';
import Popper from './Popper';

describe('<Popper />', () => {
  let mount;
  let rtlTheme;
  const render = createClientRender();
  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  before(() => {
    mount = createMount({ strict: true });
    rtlTheme = createMuiTheme({
      direction: 'rtl',
    });
  });

  after(() => {
    mount.cleanUp();
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
      mount(
        <ThemeProvider theme={rtlTheme}>
          <Popper {...defaultProps} placement="top">
            {({ placement }) => {
              renderSpy(placement);
              return null;
            }}
          </Popper>
        </ThemeProvider>,
      );
      expect(renderSpy.callCount).to.equal(2); // 2 for strict mode
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
        mount(
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
      render(
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
      popperRef.current.options.onUpdate({
        placement: 'top',
      });
      expect(renderSpy.args).to.deep.equal([['bottom'], ['bottom'], ['top'], ['top']]);
    });
  });

  describe('prop: open', () => {
    it('should open without any issue', () => {
      const wrapper = mount(<Popper {...defaultProps} open={false} />);
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
      wrapper.setProps({ open: true });
      wrapper.update();
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      expect(wrapper.find('[role="tooltip"]').text()).to.equal('Hello World');
    });

    it('should close without any issue', () => {
      const wrapper = mount(<Popper {...defaultProps} />);
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      expect(wrapper.find('[role="tooltip"]').text()).to.equal('Hello World');
      wrapper.setProps({ open: false });
      expect(wrapper.find('[role="tooltip"]').length).to.equal(0);
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
      mount(<Popper {...defaultProps} popperOptions={popperOptions} placement="top" open />);
    });
  });

  describe('prop: keepMounted', () => {
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

        const wrapper = mount(<OpenClose />);
        expect(wrapper.contains(children)).to.equal(false);
        wrapper.find('button').simulate('click');
        expect(wrapper.contains(children)).to.equal(false);
      });
    });
  });

  describe('prop: transition', () => {
    let clock;
    let looseMount;

    before(() => {
      clock = useFakeTimers();
      // StrictModeViolation: uses Grow
      looseMount = createMount({ strict: false });
    });

    after(() => {
      clock.restore();
      looseMount.cleanUp();
    });

    it('should work', () => {
      const wrapper = looseMount(
        <Popper {...defaultProps} transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      expect(wrapper.find('[role="tooltip"]').text()).to.equal('Hello World');
      wrapper.setProps({ anchorEl: null, open: false });
      clock.tick(0);
      wrapper.update();
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(false);
    });
  });

  describe('prop: popperRef', () => {
    it('should return a ref', () => {
      const ref1 = React.createRef();
      const ref2 = React.createRef();
      const wrapper = mount(<Popper {...defaultProps} popperRef={ref1} />);
      expect(ref1.current instanceof PopperJs).to.equal(true);
      wrapper.setProps({
        popperRef: ref2,
      });
      expect(ref1.current).to.equal(null);
      expect(ref2.current instanceof PopperJs).to.equal(true);
    });
  });

  describe('prop: disablePortal', () => {
    it('should work', () => {
      const popperRef = React.createRef();
      const wrapper = mount(<Popper {...defaultProps} disablePortal popperRef={popperRef} />);
      // renders
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      // correctly sets modifiers
      expect(popperRef.current.options.modifiers.preventOverflow.boundariesElement).to.equal(
        'scrollParent',
      );
    });

    it('sets preventOverflow to window when disablePortal is false', () => {
      const popperRef = React.createRef();
      const wrapper = mount(<Popper {...defaultProps} popperRef={popperRef} />);
      // renders
      expect(wrapper.find('[role="tooltip"]').exists()).to.equal(true);
      // correctly sets modifiers
      expect(popperRef.current.options.modifiers.preventOverflow.boundariesElement).to.equal(
        'window',
      );
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
      PropTypes.resetWarningCache();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn if anchorEl is not valid', () => {
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

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include('It should be an HTML element instance');
    });
  });
});
