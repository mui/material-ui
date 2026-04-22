import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import Transition from '../Transition/Transition';
import useForkRef from '../utils/useForkRef';
import describeConformance from '../../test/describeConformance';
import describeTransitionConformance from '../../test/describeTransitionConformance';

describe('<Grow />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div />,
  };

  describeConformance(
    <Grow in appear={false}>
      <div />
    </Grow>,
    () => ({
      render,
      classes: {},
      inheritComponent: Transition,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
    }),
  );

  describeTransitionConformance('Grow', () => ({
    Component: Grow,
    render,
    clock,
    lifecycle: {
      addEndListener: true,
      assertEnter: (node) => {
        expect(node.style.transition).to.match(
          /opacity (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?,( )?transform (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
      assertExit: (node) => {
        expect(node.style.opacity).to.equal('0');
        expect(node.style.transform).to.equal('scale(0.75, 0.5625)', 'should have the exit scale');
      },
    },
    propTimeout: {
      enter: {
        timeout: 556,
        callback: 'onEnter',
        assertStyle: (node) => {
          expect(node.style.transition).to.match(/556ms/);
        },
      },
      exit: {
        timeout: 446,
        callback: 'onExit',
        assertStyle: (node) => {
          expect(node.style.transition).to.match(/446ms/);
        },
      },
    },
  }));

  describe('prop: timeout', () => {
    clock.withFakeTimers();

    describe('onEnter', () => {
      it('should delay based on height when timeout is auto', () => {
        const handleEntered = spy();
        const theme = createTheme({
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

        const { setProps } = render(<MyTest />);
        setProps({
          in: true,
        });

        expect(handleEntered.callCount).to.equal(0);

        clock.tick(0);

        expect(handleEntered.callCount).to.equal(0);

        clock.tick(autoTransitionDuration);

        expect(handleEntered.callCount).to.equal(1);

        const handleEntered2 = spy();
        render(
          <Grow in timeout="auto" onEntered={handleEntered2}>
            <div />
          </Grow>,
        );

        expect(handleEntered2.callCount).to.equal(0);

        clock.tick(0);

        expect(handleEntered2.callCount).to.equal(1);
      });

      it('should use timeout as delay when timeout is number', () => {
        const timeout = 10;
        const handleEntered = spy();

        render(<Grow {...defaultProps} timeout={timeout} onEntered={handleEntered} />);

        expect(handleEntered.callCount).to.equal(0);

        clock.tick(0);

        expect(handleEntered.callCount).to.equal(0);

        clock.tick(timeout);

        expect(handleEntered.callCount).to.equal(1);
      });
    });

    describe('onExit', () => {
      it('should delay based on height when timeout is auto', () => {
        const handleExited = spy();
        const { setProps } = render(
          <Grow in timeout="auto" onExited={handleExited}>
            <div />
          </Grow>,
        );

        clock.tick(0);

        setProps({
          in: false,
        });

        expect(handleExited.callCount).to.equal(0);
        clock.tick(0);

        expect(handleExited.callCount).to.equal(1);
      });

      it('should use timeout as delay when timeout is number', () => {
        const timeout = 20;
        const handleExited = spy();
        const { setProps } = render(
          <Grow {...defaultProps} timeout={timeout} onExited={handleExited} />,
        );

        clock.tick(timeout);
        setProps({
          in: false,
        });

        expect(handleExited.callCount).to.equal(0);
        clock.tick(0);

        expect(handleExited.callCount).to.equal(0);
        clock.tick(timeout);

        expect(handleExited.callCount).to.equal(1);
      });
    });
  });
});
