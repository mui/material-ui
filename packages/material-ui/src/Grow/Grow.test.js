import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Grow from './Grow';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Transition } from 'react-transition-group';
import { useForkRef } from '../utils/reactHelpers';

describe('<Grow />', () => {
  let mount;
  const defaultProps = {
    in: true,
    children: <div />,
  };

  before(() => {
    // StrictModeViolation: uses react-transition-group
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Grow in>
      <div />
    </Grow>,
    () => ({
      classes: {},
      inheritComponent: Transition,
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  describe('transition lifecycle', () => {
    let clock;
    let wrapper;
    let child;

    const handleEnter = spy();
    const handleEntering = spy();
    const handleEntered = spy();
    const handleExit = spy();
    const handleExiting = spy();
    const handleExited = spy();

    before(() => {
      clock = useFakeTimers();
      wrapper = mount(
        <Grow
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div id="test" />
        </Grow>,
      );
      child = wrapper.find('#test');
    });

    after(() => {
      clock.restore();
    });

    describe('in', () => {
      before(() => {
        wrapper.setProps({ in: true });
      });

      describe('handleEnter()', () => {
        it('should call handleEnter()', () => {
          assert.strictEqual(handleEnter.callCount, 1);
          assert.strictEqual(handleEnter.args[0][0], child.instance());
        });

        it('should set style properties', () => {
          assert.match(
            handleEnter.args[0][0].style.transition,
            /opacity (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?,( )?transform (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
          );
        });
      });

      describe('handleEntering()', () => {
        it('should call handleEntering()', () => {
          assert.strictEqual(handleEntering.callCount, 1);
          assert.strictEqual(handleEntering.args[0][0], child.instance());
        });
      });

      describe('handleEntered()', () => {
        it('should call handleEntered()', () => {
          clock.tick(1000);
          assert.strictEqual(handleEntered.callCount, 1);
          assert.strictEqual(handleEntered.args[0][0], child.instance());
        });
      });
    });

    describe('out', () => {
      before(() => {
        wrapper.setProps({ in: true });
        wrapper.setProps({ in: false });
      });

      describe('handleExit()', () => {
        it('should call handleExit()', () => {
          assert.strictEqual(handleExit.callCount, 1);
          assert.strictEqual(handleExit.args[0][0], child.instance());
        });

        it('should set style properties', () => {
          assert.strictEqual(handleExit.args[0][0].style.opacity, '0', 'should be transparent');
          assert.strictEqual(
            handleExit.args[0][0].style.transform,
            'scale(0.75, 0.5625)',
            'should have the exit scale',
          );
        });
      });

      describe('handleExiting()', () => {
        it('should call handleExiting()', () => {
          assert.strictEqual(handleExiting.callCount, 1);
          assert.strictEqual(handleExiting.args[0][0], child.instance());
        });
      });

      describe('handleExited()', () => {
        it('should call handleExited()', () => {
          clock.tick(1000);
          assert.strictEqual(handleExited.callCount, 1);
          assert.strictEqual(handleExited.args[0][0], child.instance());
        });
      });
    });
  });

  describe('prop: timeout', () => {
    const enterDuration = 556;
    const leaveDuration = 446;
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    describe('onEnter', () => {
      it('should create proper easeOut animation', () => {
        const handleEnter = spy();
        mount(
          <Grow
            {...defaultProps}
            timeout={{
              enter: enterDuration,
              exit: leaveDuration,
            }}
            onEnter={handleEnter}
          />,
        );

        assert.match(handleEnter.args[0][0].style.transition, new RegExp(`${enterDuration}ms`));
      });

      it('should delay based on height when timeout is auto', () => {
        const handleEntered = spy();
        const theme = createMuiTheme({
          transitions: {
            getAutoHeightDuration: n => n,
          },
        });
        const autoTransitionDuration = 10;
        const FakeDiv = React.forwardRef(function FakeDiv(props, ref) {
          const divRef = React.useRef(null);
          const handleRef = useForkRef(ref, divRef);

          React.useEffect(() => {
            // For jsdom
            Object.defineProperty(divRef.current, 'clientHeight', {
              value: autoTransitionDuration,
            });
          });

          return (
            <div
              ref={handleRef}
              style={{
                height: autoTransitionDuration,
              }}
              {...props}
            />
          );
        });

        function MyTest(props) {
          return (
            <ThemeProvider theme={theme}>
              <Grow timeout="auto" onEntered={handleEntered} {...props}>
                <FakeDiv />
              </Grow>
            </ThemeProvider>
          );
        }

        const wrapper = mount(<MyTest />);
        wrapper.setProps({
          in: true,
        });
        assert.strictEqual(handleEntered.callCount, 0);
        clock.tick(0);
        assert.strictEqual(handleEntered.callCount, 0);
        clock.tick(autoTransitionDuration);
        assert.strictEqual(handleEntered.callCount, 1);

        const handleEntered2 = spy();
        mount(
          <Grow in timeout="auto" onEntered={handleEntered2}>
            <div />
          </Grow>,
        );

        assert.strictEqual(handleEntered2.callCount, 0);
        clock.tick(0);
        assert.strictEqual(handleEntered2.callCount, 1);
      });

      it('should use timeout as delay when timeout is number', () => {
        const timeout = 10;
        const handleEntered = spy();
        mount(<Grow {...defaultProps} timeout={timeout} onEntered={handleEntered} />);
        assert.strictEqual(handleEntered.callCount, 0);
        clock.tick(0);
        assert.strictEqual(handleEntered.callCount, 0);
        clock.tick(timeout);
        assert.strictEqual(handleEntered.callCount, 1);
      });
    });

    describe('onExit', () => {
      it('should delay based on height when timeout is auto', () => {
        const handleExited = spy();
        const wrapper = mount(
          <Grow in timeout="auto" onExited={handleExited}>
            <div />
          </Grow>,
        );

        clock.tick(0);

        wrapper.setProps({
          in: false,
        });

        assert.strictEqual(handleExited.callCount, 0);
        clock.tick(0);
        assert.strictEqual(handleExited.callCount, 1);
      });

      it('should use timeout as delay when timeout is number', () => {
        const timeout = 20;
        const handleExited = spy();
        const wrapper = mount(<Grow {...defaultProps} timeout={timeout} onExited={handleExited} />);

        clock.tick(timeout);
        wrapper.setProps({
          in: false,
        });

        assert.strictEqual(handleExited.callCount, 0);
        clock.tick(0);
        assert.strictEqual(handleExited.callCount, 0);
        clock.tick(timeout);
        assert.strictEqual(handleExited.callCount, 1);
      });

      it('should create proper sharp animation', () => {
        const handleExit = spy();
        const wrapper = mount(
          <Grow
            {...defaultProps}
            timeout={{
              enter: enterDuration,
              exit: leaveDuration,
            }}
            onExit={handleExit}
          />,
        );

        wrapper.setProps({
          in: false,
        });

        assert.match(handleExit.args[0][0].style.transition, new RegExp(`${leaveDuration}ms`));
      });
    });
  });
});
