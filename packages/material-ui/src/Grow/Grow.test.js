import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
// use act from test/utils/createClientRender once we drop createMount from this test
import createMount from 'test/utils/createMount';
import { act } from 'react-dom/test-utils';
import describeConformance from 'test/utils/describeConformance';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';
import Grow from './Grow';
import useForkRef from '../utils/useForkRef';

describe('<Grow />', () => {
  const mount = createMount({ strict: true });
  const defaultProps = {
    in: true,
    children: <div />,
  };

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

  describe('calls the appropriate callbacks for each transition', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('calls the appropriate callbacks for each transition', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();
      const wrapper = mount(
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
      const child = wrapper.find('#test');

      wrapper.setProps({ in: true });

      expect(handleEnter.callCount).to.equal(1);
      expect(handleEnter.args[0][0]).to.equal(child.instance());

      expect(handleEnter.args[0][0].style.transition).to.match(
        /opacity (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?,( )?transform (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child.instance());

      clock.tick(1000);
      expect(handleEntered.callCount).to.equal(1);
      expect(handleEntered.args[0][0]).to.equal(child.instance());

      wrapper.setProps({ in: false });

      expect(handleExit.callCount).to.equal(1);
      expect(handleExit.args[0][0]).to.equal(child.instance());

      expect(handleExit.args[0][0].style.opacity).to.equal('0');
      expect(handleExit.args[0][0].style.transform).to.equal(
        'scale(0.75, 0.5625)',
        'should have the exit scale',
      );

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child.instance());

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child.instance());

      clock.tick(1000);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child.instance());
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

        expect(handleEnter.args[0][0].style.transition).to.match(new RegExp(`${enterDuration}ms`));
      });

      it('should delay based on height when timeout is auto', () => {
        const handleEntered = spy();
        const theme = createMuiTheme({
          transitions: {
            getAutoHeightDuration: (n) => n,
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

        expect(handleEntered.callCount).to.equal(0);

        act(() => {
          clock.tick(0);
        });

        expect(handleEntered.callCount).to.equal(0);

        act(() => {
          clock.tick(autoTransitionDuration);
        });

        expect(handleEntered.callCount).to.equal(1);

        const handleEntered2 = spy();
        mount(
          <Grow in timeout="auto" onEntered={handleEntered2}>
            <div />
          </Grow>,
        );

        expect(handleEntered2.callCount).to.equal(0);

        act(() => {
          clock.tick(0);
        });

        expect(handleEntered2.callCount).to.equal(1);
      });

      it('should use timeout as delay when timeout is number', () => {
        const timeout = 10;
        const handleEntered = spy();

        mount(<Grow {...defaultProps} timeout={timeout} onEntered={handleEntered} />);

        expect(handleEntered.callCount).to.equal(0);

        act(() => {
          clock.tick(0);
        });

        expect(handleEntered.callCount).to.equal(0);

        act(() => {
          clock.tick(timeout);
        });

        expect(handleEntered.callCount).to.equal(1);
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

        expect(handleExited.callCount).to.equal(0);
        clock.tick(0);
        expect(handleExited.callCount).to.equal(1);
      });

      it('should use timeout as delay when timeout is number', () => {
        const timeout = 20;
        const handleExited = spy();
        const wrapper = mount(<Grow {...defaultProps} timeout={timeout} onExited={handleExited} />);

        clock.tick(timeout);
        wrapper.setProps({
          in: false,
        });

        expect(handleExited.callCount).to.equal(0);
        clock.tick(0);
        expect(handleExited.callCount).to.equal(0);
        clock.tick(timeout);
        expect(handleExited.callCount).to.equal(1);
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

        expect(handleExit.args[0][0].style.transition).to.match(new RegExp(`${leaveDuration}ms`));
      });
    });
  });
});
