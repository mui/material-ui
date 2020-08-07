import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Slide, { setTranslateValue } from './Slide';
import {
  createMuiTheme,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiStrictModeTheme,
} from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';
import { useForkRef } from '../utils';

describe('<Slide />', () => {
  const mount = createMount();
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

  it('should not override children styles', () => {
    const wrapper = mount(
      <Slide
        {...defaultProps}
        style={{ color: 'red', backgroundColor: 'yellow' }}
        theme={createMuiTheme()}
      >
        <div id="with-slide" style={{ color: 'blue' }} />
      </Slide>,
    );
    expect(wrapper.find('#with-slide').props().style).to.deep.equal({
      backgroundColor: 'yellow',
      color: 'blue',
      visibility: undefined,
    });
  });

  describe('transition lifecycle', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('tests', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();

      let child;
      const wrapper = mount(
        <Slide
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

      wrapper.setProps({ in: true });

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child);

      expect(handleEntering.args[0][0].style.transform).to.match(/none/);

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child);

      clock.tick(1000);
      expect(handleEntered.callCount).to.equal(1);

      wrapper.setProps({ in: false });

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
    it('should create proper easeOut animation onEntering', () => {
      const handleEntering = spy();

      mount(
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

    it('should create proper sharp animation onExit', () => {
      const handleExit = spy();
      const wrapper = mount(
        <Slide
          {...defaultProps}
          timeout={{
            exit: 446,
          }}
          onExit={handleExit}
        />,
      );

      wrapper.setProps({ in: false });

      expect(handleExit.args[0][0].style.transition).to.match(
        /transform 446ms cubic-bezier\(0.4, 0, 0.6, 1\)( 0ms)?/,
      );
    });
  });

  describe('prop: direction', () => {
    it('should update the position', () => {
      const wrapper = mount(<Slide {...defaultProps} in={false} direction="left" />);
      const child = wrapper.find('#testChild').instance();

      const transition1 = child.style.transform;
      wrapper.setProps({
        direction: 'right',
      });

      const transition2 = child.style.transform;
      expect(transition1).to.not.equal(transition2);
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
      return <div {...props} ref={handleRef} />;
    });

    describe('handleEnter()', () => {
      it('should set element transform and transition in the `left` direction', () => {
        let nodeEnterTransformStyle;
        const wrapper = mount(
          <Slide
            direction="left"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(
          `translateX(${global.innerWidth}px) translateX(-300px)`,
        );
      });

      it('should set element transform and transition in the `right` direction', () => {
        let nodeEnterTransformStyle;
        const wrapper = mount(
          <Slide
            direction="right"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform and transition in the `up` direction', () => {
        let nodeEnterTransformStyle;
        const wrapper = mount(
          <Slide
            direction="up"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(
          `translateY(${global.innerHeight}px) translateY(-200px)`,
        );
      });

      it('should set element transform and transition in the `down` direction', () => {
        let nodeEnterTransformStyle;
        const wrapper = mount(
          <Slide
            direction="down"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateY(-500px)');
      });

      it('should reset the previous transition if needed', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const wrapper = mount(
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
        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform in the `up` direction when element is offscreen', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const wrapper = mount(
          <Slide
            direction="up"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv rect={{ top: -100 }} ref={childRef} />
          </Slide>,
        );

        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(
          `translateY(${global.innerHeight}px) translateY(100px)`,
        );
      });

      it('should set element transform in the `left` direction when element is offscreen', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const wrapper = mount(
          <Slide
            direction="left"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv rect={{ left: -100 }} ref={childRef} />
          </Slide>,
        );

        wrapper.setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(
          `translateX(${global.innerWidth}px) translateX(100px)`,
        );
      });
    });

    describe('handleExiting()', () => {
      it('should set element transform and transition in the `left` direction', () => {
        let nodeExitingTransformStyle;
        const wrapper = mount(
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

        wrapper.setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal(
          `translateX(${global.innerWidth}px) translateX(-300px)`,
        );
      });

      it('should set element transform and transition in the `right` direction', () => {
        let nodeExitingTransformStyle;
        const wrapper = mount(
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

        wrapper.setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform and transition in the `up` direction', () => {
        let nodeExitingTransformStyle;
        const wrapper = mount(
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

        wrapper.setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal(
          `translateY(${global.innerHeight}px) translateY(-200px)`,
        );
      });

      it('should set element transform and transition in the `down` direction', () => {
        let nodeExitingTransformStyle;
        const wrapper = mount(
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

        wrapper.setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal('translateY(-500px)');
      });
    });
  });

  describe('mount', () => {
    it('should work when initially hidden', () => {
      const childRef = React.createRef();
      mount(
        <Slide in={false}>
          <div ref={childRef}>Foo</div>
        </Slide>,
      );
      const transition = childRef.current;

      expect(transition.style.visibility).to.equal('hidden');
      expect(transition.style.transform).to.not.equal(undefined);
    });
  });

  describe('resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should recompute the correct position', () => {
      const wrapper = mount(
        <Slide direction="up" in={false}>
          <div id="testChild">Foo</div>
        </Slide>,
      );

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      const child = wrapper.find('#testChild').instance();

      expect(child.style.transform).to.not.equal(undefined);
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
      expect(element.style.transform).to.equal(
        `translateY(${global.innerHeight}px) translateY(-780px)`,
      );
    });

    it('should do nothing when visible', () => {
      mount(<Slide {...defaultProps} />);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
    });
  });

  describe('server-side', () => {
    it('should be initially hidden', () => {
      const wrapper = mount(
        <Slide {...defaultProps} in={false}>
          <div id="with-slide" />
        </Slide>,
      );
      expect(wrapper.find('#with-slide').props().style.visibility).to.equal('hidden');
    });
  });

  it('has no StrictMode warnings in a StrictMode theme', () => {
    mount(
      <React.StrictMode>
        <ThemeProvider theme={createMuiStrictModeTheme()}>
          <Slide appear in>
            <div />
          </Slide>
        </ThemeProvider>
      </React.StrictMode>,
    );
  });
});
