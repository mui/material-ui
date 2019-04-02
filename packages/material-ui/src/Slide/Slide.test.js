import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import {
  createShallow,
  createMount,
  describeConformance,
  unwrap,
} from '@material-ui/core/test-utils';
import Slide, { setTranslateValue } from './Slide';
import transitions, { easing } from '../styles/transitions';
import createMuiTheme from '../styles/createMuiTheme';

describe('<Slide />', () => {
  let shallow;
  let mount;
  const SlideNaked = unwrap(Slide);
  const defaultProps = {
    in: true,
    children: <div />,
    direction: 'down',
  };

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
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
      inheritComponent: 'Transition',
      mount,
      refInstanceof: React.Component,
      testComponentPropWith: false,
    }),
  );

  it('should not override children styles', () => {
    const wrapper = mount(
      <SlideNaked
        {...defaultProps}
        style={{ color: 'red', backgroundColor: 'yellow' }}
        theme={createMuiTheme()}
      >
        <div id="with-slide" style={{ color: 'blue' }} />
      </SlideNaked>,
    );
    assert.deepEqual(wrapper.find('#with-slide').props().style, {
      backgroundColor: 'yellow',
      color: 'blue',
      visibility: undefined,
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Slide {...defaultProps} {...handlers} />).childAt(0);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          fakeTransform: 'none',
          style: {},
          getBoundingClientRect: () => ({}),
        });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('prop: timeout', () => {
    let wrapper;
    let instance;
    let element;
    const enterDuration = 556;
    const leaveDuration = 446;

    beforeEach(() => {
      wrapper = shallow(
        <Slide
          {...defaultProps}
          timeout={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
        />,
      );
      instance = wrapper.instance();
      element = { fakeTransform: 'none', getBoundingClientRect: () => ({}), style: {} };
    });

    it('should create proper easeOut animation onEntering', () => {
      instance.handleEntering(element);
      const animation = transitions.create('transform', {
        duration: enterDuration,
        easing: easing.easeOut,
      });
      assert.strictEqual(element.style.transition, animation);
    });

    it('should create proper sharp animation onExit', () => {
      instance.handleExit(element);
      const animation = transitions.create('transform', {
        duration: leaveDuration,
        easing: easing.sharp,
      });
      assert.strictEqual(element.style.transition, animation);
    });
  });

  describe('prop: direction', () => {
    it('should update the position', () => {
      const wrapper = mount(
        <SlideNaked {...defaultProps} theme={createMuiTheme()} in={false} direction="left" />,
      );
      const transition = wrapper.instance().childDOMNode;

      const transition1 = transition.style.transform;
      wrapper.setProps({
        direction: 'right',
      });

      const transition2 = transition.style.transform;
      assert.notStrictEqual(transition1, transition2);
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Slide {...defaultProps} />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      beforeEach(() => {
        element = {
          fakeTransform: 'none',
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 200,
            bottom: 500,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(100vw) translateX(-300px)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(-824px)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-200px)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateY(-524px)');
      });

      it('should reset the previous transition if needed', () => {
        element.style.transform = 'translateX(-824px)';
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(-824px)');
      });
    });

    describe('handleEntering()', () => {
      let element;

      before(() => {
        element = { style: {} };
        instance.handleEntering(element);
      });

      it('should reset the translate3d', () => {
        assert.strictEqual(element.style.transform, 'translate(0, 0)');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = {
          fakeTransform: 'none',
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 200,
            bottom: 500,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(100vw) translateX(-300px)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(-824px)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-200px)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateY(-524px)');
      });
    });
  });

  describe('mount', () => {
    it('should work when initially hidden', () => {
      const wrapper = mount(
        <SlideNaked theme={createMuiTheme()} in={false}>
          <div>Foo</div>
        </SlideNaked>,
      );
      const transition = wrapper.instance().childDOMNode;

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
        <SlideNaked theme={createMuiTheme()} direction="up" in={false}>
          <div>Foo</div>
        </SlideNaked>,
      );
      const instance = wrapper.instance();
      instance.handleResize();
      clock.tick(166);
      const transition = instance.childDOMNode;

      assert.notStrictEqual(transition.style.transform, undefined);
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
      setTranslateValue(
        {
          direction: 'up',
        },
        element,
      );
      assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-780px)');
    });

    it('should do nothing when visible', () => {
      const wrapper = shallow(<Slide {...defaultProps} />);
      const instance = wrapper.instance();
      instance.handleResize();
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
