import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Grow from '../Grow';
import Popper from './Popper';

describe('<Popper />', () => {
  let mount;
  const defaultProps = {
    anchorEl: () => window.document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Popper {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  describe('prop: placement', () => {
    before(() => {
      document.body.setAttribute('dir', 'rtl');
    });

    after(() => {
      document.body.removeAttribute('dir');
    });

    it('should have top placement', () => {
      const renderSpy = spy();
      mount(
        <Popper {...defaultProps} placement="top">
          {({ placement }) => {
            renderSpy(placement);
            return null;
          }}
        </Popper>,
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
          <Popper {...defaultProps} placement={test.in}>
            {({ placement }) => {
              renderSpy(placement);
              return null;
            }}
          </Popper>,
        );
        assert.strictEqual(renderSpy.callCount, 2);
        assert.strictEqual(renderSpy.args[0][0], test.out);
      });
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
      assert.include(consoleErrorMock.args()[0][0], 'It should be an Element instance');
    });

    // it('should warn if anchorEl is not visible', () => {
    //   mount(<Popper {...defaultProps} open anchorEl={document.createElement('div')} />);
    //   assert.strictEqual(consoleErrorMock.callCount(), 1);
    //   assert.include(consoleErrorMock.args()[0][0], 'The node element should be visible');
    // });
  });
});
