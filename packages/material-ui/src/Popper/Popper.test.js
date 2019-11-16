import React from 'react';
import { assert, expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import PopperJS from 'popper.js';
import Grow from '../Grow';
import Popper from './Popper';

describe('<Popper />', () => {
  let mount;
  let rtlTheme;
  const render = createClientRender({ strict: true });
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
      assert.strictEqual(renderSpy.callCount, 2); // 2 for strict mode
      assert.strictEqual(renderSpy.args[0][0], 'top');
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
        assert.strictEqual(renderSpy.callCount, 2);
        assert.strictEqual(renderSpy.args[0][0], test.out);
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
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
      wrapper.setProps({ open: true });
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      assert.strictEqual(wrapper.find('[role="tooltip"]').text(), 'Hello World');
    });

    it('should close without any issue', () => {
      const wrapper = mount(<Popper {...defaultProps} />);
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      assert.strictEqual(wrapper.find('[role="tooltip"]').text(), 'Hello World');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.find('[role="tooltip"]').length, 0);
    });
  });

  describe('prop: popperOptions', () => {
    it('should pass all popperOptions to popperjs', done => {
      const popperOptions = {
        onCreate: data => {
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
        assert.strictEqual(wrapper.contains(children), false);
        wrapper.find('button').simulate('click');
        assert.strictEqual(wrapper.contains(children), false);
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
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      assert.strictEqual(wrapper.find('[role="tooltip"]').text(), 'Hello World');
      wrapper.setProps({ anchorEl: null, open: false });
      clock.tick(0);
      wrapper.update();
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), false);
    });
  });

  describe('prop: popperRef', () => {
    it('should return a ref', () => {
      const ref1 = React.createRef();
      const ref2 = React.createRef();
      const wrapper = mount(<Popper {...defaultProps} popperRef={ref1} />);
      assert.strictEqual(ref1.current instanceof PopperJS, true);
      wrapper.setProps({
        popperRef: ref2,
      });
      assert.strictEqual(ref1.current, null);
      assert.strictEqual(ref2.current instanceof PopperJS, true);
    });
  });

  describe('prop: disablePortal', () => {
    it('should work', () => {
      const popperRef = React.createRef();
      const wrapper = mount(<Popper {...defaultProps} disablePortal popperRef={popperRef} />);
      // renders
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      // correctly sets modifiers
      assert.strictEqual(
        popperRef.current.options.modifiers.preventOverflow.boundariesElement,
        'scrollParent',
      );
    });

    it('sets preventOverflow to window when disablePortal is false', () => {
      const popperRef = React.createRef();
      const wrapper = mount(<Popper {...defaultProps} popperRef={popperRef} />);
      // renders
      assert.strictEqual(wrapper.find('[role="tooltip"]').exists(), true);
      // correctly sets modifiers
      assert.strictEqual(
        popperRef.current.options.modifiers.preventOverflow.boundariesElement,
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
      mount(<Popper {...defaultProps} open anchorEl={null} />);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], 'It should be an HTML Element instance');
    });

    // it('should warn if anchorEl is not visible', () => {
    //   mount(<Popper {...defaultProps} open anchorEl={document.createElement('div')} />);
    //   assert.strictEqual(consoleErrorMock.callCount(), 1);
    //   assert.include(consoleErrorMock.args()[0][0], 'The node element should be visible');
    // });
  });
});
