import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { act, createRenderer } from '@mui/internal-test-utils';
import { Transition } from 'react-transition-group';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { setTranslateValue } from './Slide';
import { useForkRef } from '../utils';
import describeConformance from '../../test/describeConformance';

describe('<Slide />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div id="testChild" />,
    direction: 'down',
  };

  describeConformance(
    <Slide in>
      <div />
    </Slide>,
    () => ({
      render,
      classes: {},
      inheritComponent: Transition,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        'componentsProp',
        'themeDefaultProps',
        'themeStyleOverrides',
        'themeVariants',
      ],
    }),
  );

  it('should not override children styles', () => {
    const { container } = render(
      <Slide
        {...defaultProps}
        style={{ color: 'red', backgroundColor: 'yellow' }}
        theme={createTheme()}
      >
        <div id="with-slide" style={{ color: 'blue' }} />
      </Slide>,
    );

    const slide = container.querySelector('#with-slide');

    expect(slide.style).to.have.property('backgroundColor', 'yellow');
    expect(slide.style).to.have.property('color', 'blue');
    expect(slide.style).to.have.property('visibility', '');
  });

  describe('transition lifecycle', () => {
    clock.withFakeTimers();

    it('tests', () => {
      const handleAddEndListener = spy();
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();

      let child;
      const { setProps } = render(
        <Slide
          addEndListener={handleAddEndListener}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div
            ref={(ref) => {
              child = ref;
            }}
          />
        </Slide>,
      );

      setProps({ in: true });

      expect(handleAddEndListener.callCount).to.equal(1);
      expect(handleAddEndListener.args[0][0]).to.equal(child);
      expect(typeof handleAddEndListener.args[0][1]).to.equal('function');

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child);

      expect(handleEntering.args[0][0].style.transform).to.match(/none/);

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child);

      clock.tick(1000);
      expect(handleEntered.callCount).to.equal(1);

      setProps({ in: false });

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child);

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child);

      clock.tick(1000);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child);
    });
  });

  describe('prop: timeout', () => {
    it('should create proper enter animation onEntering', () => {
      const handleEntering = spy();

      render(
        <Slide
          {...defaultProps}
          timeout={{
            enter: 556,
          }}
          onEntering={handleEntering}
        />,
      );

      expect(handleEntering.args[0][0].style.transition).to.match(
        /transform 556ms cubic-bezier\(0(.0)?, 0, 0.2, 1\)( 0ms)?/,
      );
    });

    it('should create proper exit animation', () => {
      const handleExit = spy();
      const { setProps } = render(
        <Slide
          {...defaultProps}
          timeout={{
            exit: 446,
          }}
          onExit={handleExit}
        />,
      );

      setProps({ in: false });

      expect(handleExit.args[0][0].style.transition).to.match(
        /transform 446ms cubic-bezier\(0.4, 0, 0.6, 1\)( 0ms)?/,
      );
    });

    it('should render the default theme values by default', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const theme = createTheme();
      const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;

      const { getByTestId } = render(
        <Slide in appear>
          <div data-testid="child">Foo</div>
        </Slide>,
      );

      const child = getByTestId('child');
      expect(child).toHaveComputedStyle({
        transitionDuration: `${enteringScreenDurationInSeconds}s`,
      });
    });

    it('should render the custom theme values', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const theme = createTheme({
        transitions: {
          duration: {
            enteringScreen: 1,
          },
        },
      });

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <Slide in appear>
            <div data-testid="child">Foo</div>
          </Slide>
        </ThemeProvider>,
      );

      const child = getByTestId('child');
      expect(child).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });
  });

  describe('prop: easing', () => {
    it('should create proper enter animation', () => {
      const handleEntering = spy();

      render(
        <Slide
          {...defaultProps}
          easing={{
            enter: 'cubic-bezier(1, 1, 0, 0)',
          }}
          onEntering={handleEntering}
        />,
      );

      expect(handleEntering.args[0][0].style.transition).to.match(
        /transform 225ms cubic-bezier\(1, 1, 0, 0\)( 0ms)?/,
      );
    });

    it('should create proper exit animation', () => {
      const handleExit = spy();
      const { setProps } = render(
        <Slide
          {...defaultProps}
          easing={{
            exit: 'cubic-bezier(0, 0, 1, 1)',
          }}
          onExit={handleExit}
        />,
      );

      setProps({ in: false });

      expect(handleExit.args[0][0].style.transition).to.match(
        /transform 195ms cubic-bezier\(0, 0, 1, 1\)( 0ms)?/,
      );
    });

    it('should render the default theme values by default', function test() {
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const theme = createTheme();
      const handleEntering = spy();
      render(<Slide {...defaultProps} onEntering={handleEntering} />);

      expect(handleEntering.args[0][0].style.transition).to.equal(
        `transform 225ms ${theme.transitions.easing.easeOut} 0ms`,
      );
    });

    it('should render the custom theme values', function test() {
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const theme = createTheme({
        transitions: {
          easing: {
            easeOut: 'cubic-bezier(1, 1, 1, 1)',
          },
        },
      });

      const handleEntering = spy();
      render(
        <ThemeProvider theme={theme}>
          <Slide {...defaultProps} onEntering={handleEntering} />
        </ThemeProvider>,
      );

      expect(handleEntering.args[0][0].style.transition).to.equal(
        `transform 225ms ${theme.transitions.easing.easeOut} 0ms`,
      );
    });
  });

  describe('prop: direction', () => {
    it('should update the position', () => {
      const { container, setProps } = render(
        <Slide {...defaultProps} in={false} direction="left" />,
      );
      const child = container.querySelector('#testChild');

      const transition1 = child.style.transform;
      setProps({
        direction: 'right',
      });

      const transition2 = child.style.transform;
      expect(transition1).not.to.equal(transition2);
    });
  });

  describe('transform styling', () => {
    const FakeDiv = React.forwardRef((props, ref) => {
      const stubBoundingClientRect = (element) => {
        if (element !== null) {
          element.fakeTransform = 'none';
          try {
            stub(element, 'getBoundingClientRect').callsFake(() => ({
              width: 500,
              height: 300,
              left: 300,
              right: 800,
              top: 200,
              bottom: 500,
              ...props.rect,
            }));
          } catch (error) {
            // already stubbed
          }
        }
      };
      const handleRef = useForkRef(ref, stubBoundingClientRect);
      return <div {...props} style={{ height: 300, width: 500 }} ref={handleRef} />;
    });

    describe('handleEnter()', () => {
      it('should set element transform and transition in the `left` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="left"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateX(${global.innerWidth - 300}px)`);
      });

      it('should set element transform and transition in the `right` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="right"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateX(-${300 + 500}px)`);
      });

      it('should set element transform and transition in the `up` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="up"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateY(${global.innerHeight - 200}px)`);
      });

      it('should set element transform and transition in the `down` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="down"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateY(-500px)');
      });

      it('should reset the previous transition if needed', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="right"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv ref={childRef} />
          </Slide>,
        );

        childRef.current.style.transform = 'translateX(-800px)';
        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform in the `up` direction when element is offscreen', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="up"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv rect={{ top: -100 }} ref={childRef} />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateY(${global.innerHeight + 100}px)`);
      });

      it('should set element transform in the `left` direction when element is offscreen', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="left"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv rect={{ left: -100 }} ref={childRef} />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateX(${global.innerWidth + 100}px)`);
      });
    });

    describe('handleExiting()', () => {
      it('should set element transform and transition in the `left` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="left"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal(`translateX(${global.innerWidth - 300}px)`);
      });

      it('should set element transform and transition in the `right` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="right"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform and transition in the `up` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="up"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal(`translateY(${global.innerHeight - 200}px)`);
      });

      it('should set element transform and transition in the `down` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="down"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal('translateY(-500px)');
      });
    });

    describe('prop: container', () => {
      it('should set element transform and transition in the `up` direction', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // Need layout
          this.skip();
        }

        let nodeExitingTransformStyle;
        const height = 200;
        function Test(props) {
          const [container, setContainer] = React.useState(null);
          return (
            <div
              ref={(node) => {
                setContainer(node);
              }}
              style={{ height, width: 200 }}
            >
              <Slide
                direction="up"
                in
                {...props}
                container={container}
                onExit={(node) => {
                  nodeExitingTransformStyle = node.style.transform;
                }}
              >
                <FakeDiv rect={{ top: 8 }} />
              </Slide>
            </div>
          );
        }
        const { setProps } = render(<Test />);
        setProps({ in: false });
        expect(nodeExitingTransformStyle).to.equal(`translateY(${height}px)`);
      });
    });

    describe('mount', () => {
      it('should work when initially hidden', () => {
        const childRef = React.createRef();
        render(
          <Slide in={false}>
            <div ref={childRef}>Foo</div>
          </Slide>,
        );
        const transition = childRef.current;

        expect(transition.style.visibility).to.equal('hidden');
        expect(transition.style.transform).not.to.equal(undefined);
      });
    });

    describe('resize', () => {
      clock.withFakeTimers();

      it('should recompute the correct position', () => {
        const { container } = render(
          <Slide direction="up" in={false}>
            <div id="testChild">Foo</div>
          </Slide>,
        );

        act(() => {
          window.dispatchEvent(new window.Event('resize', {}));
        });
        clock.tick(166);

        const child = container.querySelector('#testChild');
        expect(child.style.transform).not.to.equal(undefined);
      });

      it('should take existing transform into account', () => {
        const element = {
          fakeTransform: 'transform matrix(1, 0, 0, 1, 0, 420)',
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 1200,
            bottom: 1500,
          }),
          style: {},
        };
        setTranslateValue('up', element);
        expect(element.style.transform).to.equal(`translateY(${global.innerHeight - 780}px)`);
      });

      it('should do nothing when visible', () => {
        render(<Slide {...defaultProps} />);
        act(() => {
          window.dispatchEvent(new window.Event('resize', {}));
        });
        clock.tick(166);
      });
    });
  });

  describe('server-side', () => {
    it('should be initially hidden', () => {
      const { container } = render(
        <Slide {...defaultProps} in={false}>
          <div id="with-slide" />
        </Slide>,
      );

      const slide = container.querySelector('#with-slide');

      expect(slide.style).to.have.property('visibility', 'hidden');
    });
  });
});
