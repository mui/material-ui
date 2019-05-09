import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import Slide, { setTranslateValue } from './Slide';
import createMuiTheme from '../styles/createMuiTheme';
import { Transition } from 'react-transition-group';

describe('<Slide />', () => {
  let mount;
  const defaultProps = {
    in: true,
    children: <div id="testChild" />,
    direction: 'down',
  };

  before(() => {
    // StrictModeViolation: uses react-transition-group
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Slide in>
      <div />
    </Slide>,
    () => ({
      classes: {},
      inheritComponent: Transition,
      mount,
      refInstanceof: React.Component,
      skip: ['componentProp', 'refForwarding'],
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
    assert.deepEqual(wrapper.find('#with-slide').props().style, {
      backgroundColor: 'yellow',
      color: 'blue',
      visibility: undefined,
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let clock;
    let child;

    const handleEnter = spy();
    const handleEntering = spy();
    const handleEntered = spy();
    const handleExit = spy();
    const handleExiting = spy();
    const handleExited = spy();

    before(() => {
      wrapper = mount(
        <Slide
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div
            ref={ref => {
              child = ref;
            }}
          />
        </Slide>,
      );
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    describe('in', () => {
      before(() => {
        wrapper.setProps({ in: true });
      });

      describe('handleEnter()', () => {
        it('should call handleEnter', () => {
          assert.strictEqual(handleEntering.callCount, 1);
          assert.strictEqual(handleEntering.args[0][0], child);
        });
      });

      describe('handleEntering()', () => {
        it('should reset the translate3d', () => {
          assert.match(handleEntering.args[0][0].style.transform, /translate\(0(px)?, 0(px)?\)/);
        });

        it('should call handleEntering', () => {
          assert.strictEqual(handleEntering.callCount, 1);
          assert.strictEqual(handleEntering.args[0][0], child);
        });
      });

      describe('handleEntered()', () => {
        it('should have called onEntered', () => {
          clock.tick(1000);
          assert.strictEqual(handleEntered.callCount, 1);
        });
      });
    });

    describe('out', () => {
      before(() => {
        wrapper.setProps({ in: true });
        wrapper.setProps({ in: false });
      });

      describe('handleExit()', () => {
        it('should call handleExit', () => {
          assert.strictEqual(handleExiting.callCount, 1);
          assert.strictEqual(handleExiting.args[0][0], child);
        });
      });

      describe('handleExiting()', () => {
        it('should call onExiting', () => {
          assert.strictEqual(handleExiting.callCount, 1);
          assert.strictEqual(handleExiting.args[0][0], child);
        });
      });

      describe('handleExited()', () => {
        it('should call onExited', () => {
          clock.tick(1000);
          assert.strictEqual(handleExited.callCount, 1);
          assert.strictEqual(handleExited.args[0][0], child);
        });
      });
    });
  });

  describe('prop: timeout', () => {
    let wrapper;
    const enterDuration = 556;
    const leaveDuration = 446;
    const handleEntering = spy();
    const handleExit = spy();

    beforeEach(() => {
      wrapper = mount(
        <Slide
          {...defaultProps}
          timeout={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
          onEntering={handleEntering}
          onExit={handleExit}
        />,
      );
    });

    it('should create proper easeOut animation onEntering', () => {
      assert.match(
        handleEntering.args[0][0].style.transition,
        /transform 556ms cubic-bezier\(0(.0)?, 0, 0.2, 1\)( 0ms)?/,
      );
    });

    it('should create proper sharp animation onExit', () => {
      wrapper.setProps({ in: false });
      assert.match(
        handleExit.args[0][0].style.transition,
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
      assert.notStrictEqual(transition1, transition2);
    });
  });

  describe('transform styling', () => {
    let wrapper;
    let child;
    const handleEnter = spy();
    let nodeEnterTransformStyle;
    const handleEnterWrapper = (...args) => {
      handleEnter(...args);
      nodeEnterTransformStyle = args[0].style.transform;
    };
    const handleExiting = spy();
    let nodeExitingTransformStyle;
    const handleExitingWrapper = (...args) => {
      handleExiting(...args);
      nodeExitingTransformStyle = args[0].style.transform;
    };

    before(() => {
      wrapper = mount(
        <Slide onEnter={handleEnterWrapper} onExiting={handleExitingWrapper}>
          <div
            ref={ref => {
              child = ref;
            }}
          />
        </Slide>,
      );

      child.fakeTransform = 'none';
      stub(child, 'getBoundingClientRect').callsFake(() => ({
        width: 500,
        height: 300,
        left: 300,
        right: 800,
        top: 200,
        bottom: 500,
      }));
    });

    describe('handleEnter()', () => {
      afterEach(() => {
        wrapper.setProps({
          in: false,
        });
      });

      it('should set element transform and transition in the `left` direction', () => {
        wrapper.setProps({ direction: 'left' });
        wrapper.setProps({ in: true });
        assert.strictEqual(nodeEnterTransformStyle, 'translateX(100vw) translateX(-300px)');
      });

      it('should set element transform and transition in the `right` direction', () => {
        wrapper.setProps({ direction: 'right' });
        wrapper.setProps({ in: true });
        assert.strictEqual(nodeEnterTransformStyle, 'translateX(-824px)');
      });

      it('should set element transform and transition in the `up` direction', () => {
        wrapper.setProps({ direction: 'up' });
        wrapper.setProps({ in: true });
        assert.strictEqual(nodeEnterTransformStyle, 'translateY(100vh) translateY(-200px)');
      });

      it('should set element transform and transition in the `down` direction', () => {
        wrapper.setProps({ direction: 'down' });
        wrapper.setProps({ in: true });
        assert.strictEqual(nodeEnterTransformStyle, 'translateY(-524px)');
      });

      it('should reset the previous transition if needed', () => {
        child.style.transform = 'translateX(-824px)';
        wrapper.setProps({ direction: 'right' });
        wrapper.setProps({ in: true });
        assert.strictEqual(nodeEnterTransformStyle, 'translateX(-824px)');
      });
    });

    describe('handleExiting()', () => {
      before(() => {
        wrapper.setProps({
          in: true,
        });
      });

      afterEach(() => {
        wrapper.setProps({
          in: true,
        });
      });

      it('should set element transform and transition in the `left` direction', () => {
        wrapper.setProps({ direction: 'left' });
        wrapper.setProps({ in: false });
        assert.strictEqual(nodeExitingTransformStyle, 'translateX(100vw) translateX(-300px)');
      });

      it('should set element transform and transition in the `right` direction', () => {
        wrapper.setProps({ direction: 'right' });
        wrapper.setProps({ in: false });
        assert.strictEqual(nodeExitingTransformStyle, 'translateX(-824px)');
      });

      it('should set element transform and transition in the `up` direction', () => {
        wrapper.setProps({ direction: 'up' });
        wrapper.setProps({ in: false });
        assert.strictEqual(nodeExitingTransformStyle, 'translateY(100vh) translateY(-200px)');
      });

      it('should set element transform and transition in the `down` direction', () => {
        wrapper.setProps({ direction: 'down' });
        wrapper.setProps({ in: false });
        assert.strictEqual(nodeExitingTransformStyle, 'translateY(-524px)');
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

      assert.strictEqual(transition.style.visibility, 'hidden');
      assert.notStrictEqual(transition.style.transform, undefined);
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

      assert.notStrictEqual(child.style.transform, undefined);
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
      assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-780px)');
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
      assert.strictEqual(wrapper.find('#with-slide').props().style.visibility, 'hidden');
    });
  });
});
