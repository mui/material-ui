// @flow

import React from 'react';
import { ReactWrapper } from 'enzyme';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Collapse from './Collapse';

describe('<Collapse />', () => {
  let shallow;
  let classes;
  const props = {
    in: true,
    children: <div />,
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Collapse {...props} />);
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Collapse {...props} />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  it('should render a container around the wrapper', () => {
    const wrapper = shallow(<Collapse {...props} classes={{ container: 'woofCollapse1' }} />);
    const child = new ReactWrapper(wrapper.props().children('entered'));
    assert.strictEqual(child.name(), 'div');
    assert.strictEqual(child.hasClass(classes.container), true);
    assert.strictEqual(child.hasClass('woofCollapse1'), true);
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const wrapper = shallow(<Collapse {...props}>{children}</Collapse>);
    const child = new ReactWrapper(wrapper.props().children('entered'));
    assert.strictEqual(child.childAt(0).is('div'), true, 'should be a div');
    assert.strictEqual(
      child
        .childAt(0)
        .childAt(0)
        .children()
        .type(),
      'h1',
      'should wrap the children',
    );
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Collapse {...props} {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {} });
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
        <Collapse
          {...props}
          timeout={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
        />,
      );
      instance = wrapper.instance();
      element = { getBoundingClientRect: () => ({}), style: {} };
    });

    it('should create proper easeOut animation onEntering', () => {
      instance.handleEntering(element);
      assert.strictEqual(element.style.transitionDuration, `${enterDuration}ms`);
    });

    it('should create proper sharp animation onExiting', () => {
      instance.handleExiting(element);
      assert.strictEqual(element.style.transitionDuration, `${leaveDuration}ms`);
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Collapse {...props} />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      before(() => {
        element = { style: { height: 32 } };
        instance.handleEnter(element);
      });

      it('should set element height to 0 initially', () => {
        assert.strictEqual(element.style.height, '0px', 'should set the height to 0');
      });
    });

    describe('handleEntering()', () => {
      let heightMock;
      let element;

      before(() => {
        heightMock = 666;
        element = { style: { height: heightMock, transitionDuration: undefined } };
        instance.handleEntering(element);
      });

      it('should set height to the 0', () => {
        assert.strictEqual(element.style.height, '0px', 'should have 0px height');
      });

      it('should call handleEntering', () => {
        const onEnteringStub = spy();
        wrapper.setProps({ onEntering: onEnteringStub });
        instance = wrapper.instance();
        instance.handleEntering(element);

        assert.strictEqual(onEnteringStub.callCount, 1);
        assert.strictEqual(onEnteringStub.calledWith(element), true);
      });

      describe('timeout', () => {
        let theme;
        let timeoutMock;
        let restore;

        before(() => {
          theme = instance.props.theme;
          restore = theme.transitions.getAutoHeightDuration;
          theme.transitions.getAutoHeightDuration = stub().returns('woofCollapseStub');
          wrapper.setProps({ timeout: 'auto' });
          instance = wrapper.instance();
        });

        after(() => {
          theme.transitions.getAutoHeightDuration = restore;
        });

        it('no wrapper', () => {
          instance.wrapper = false;
          instance.handleEntering(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${theme.transitions.getAutoHeightDuration(0)}ms`,
          );
        });

        it('has wrapper', () => {
          const clientHeightMock = 10;
          instance.wrapper = { clientHeight: clientHeightMock };
          instance.handleEntering(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${theme.transitions.getAutoHeightDuration(clientHeightMock)}ms`,
          );
        });

        it('number should set timeout to ms', () => {
          timeoutMock = 3;
          wrapper.setProps({ timeout: timeoutMock });
          instance = wrapper.instance();
          instance.handleEntering(element);

          assert.strictEqual(element.style.transitionDuration, `${timeoutMock}ms`);
        });

        it('nothing should not set timeout', () => {
          const elementBackup = element;
          wrapper.setProps({ timeout: undefined });
          instance = wrapper.instance();
          instance.handleEntering(element);

          assert.strictEqual(
            element.style.transitionDuration,
            elementBackup.style.transitionDuration,
          );
        });
      });
    });

    describe('handleEntered()', () => {
      let element;
      let handleEnteredWrapper;
      let handleEnteredInstance;
      let onEnteredSpy;

      before(() => {
        handleEnteredWrapper = shallow(<Collapse {...props} />);
        onEnteredSpy = spy();
        handleEnteredWrapper.setProps({ onEntered: onEnteredSpy });
        handleEnteredInstance = handleEnteredWrapper.instance();
        element = { style: { height: 666, transitionDuration: '500ms' } };
        handleEnteredInstance.handleEntered(element);
      });

      it('should set height to auto', () => {
        assert.strictEqual(element.style.height, 'auto', 'should have auto height');
      });

      it('should have called onEntered', () => {
        assert.strictEqual(onEnteredSpy.callCount, 1, 'should have called props.onEntered');
      });
    });

    describe('handleExit()', () => {
      it('should set height to the wrapper height', () => {
        const element = { style: { height: 'auto' } };
        instance.wrapper = { clientHeight: 666 };
        instance.handleExit(element);
        assert.strictEqual(element.style.height, '666px', 'should have 666px height');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = { style: { height: 666, transitionDuration: undefined } };
        instance.handleExiting(element);
      });

      it('should set height to the 0', () => {
        assert.strictEqual(element.style.height, '0px', 'should have 0px height');
      });

      it('should call onExiting', () => {
        const onExitingStub = spy();
        wrapper.setProps({ onExiting: onExitingStub });
        instance = wrapper.instance();
        instance.handleExiting(element);

        assert.strictEqual(onExitingStub.callCount, 1);
        assert.strictEqual(onExitingStub.calledWith(element), true);
      });

      describe('timeout', () => {
        let theme;
        let timeoutMock;
        let restore;

        before(() => {
          theme = instance.props.theme;
          restore = theme.transitions.getAutoHeightDuration;
          theme.transitions.getAutoHeightDuration = stub().returns('woofCollapseStub2');
          wrapper.setProps({ timeout: 'auto' });
          instance = wrapper.instance();
        });

        after(() => {
          theme.transitions.getAutoHeightDuration = restore;
        });

        it('no wrapper', () => {
          instance.wrapper = false;
          instance.handleExiting(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${theme.transitions.getAutoHeightDuration(0)}ms`,
          );
        });

        it('has wrapper', () => {
          const clientHeightMock = 10;
          instance.wrapper = { clientHeight: clientHeightMock };
          instance.handleExiting(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${theme.transitions.getAutoHeightDuration(clientHeightMock)}ms`,
          );
        });

        it('number should set timeout to ms', () => {
          timeoutMock = 3;
          wrapper.setProps({ timeout: timeoutMock });
          instance = wrapper.instance();
          instance.handleExiting(element);

          assert.strictEqual(element.style.transitionDuration, `${timeoutMock}ms`);
        });

        it('nothing should not set timeout', () => {
          const elementBackup = element;
          wrapper.setProps({ timeout: undefined });
          instance = wrapper.instance();
          instance.handleExiting(element);

          assert.strictEqual(
            element.style.transitionDuration,
            elementBackup.style.transitionDuration,
          );
        });
      });
    });
  });

  describe('handleRequestTimeout()', () => {
    let instance;
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should return autoTransitionDuration when timeout is auto', () => {
      const wrapper = shallow(<Collapse {...props} timeout="auto" />);
      assert.strictEqual(wrapper.props().timeout, null);
      instance = wrapper.instance();
      const next = spy();

      const autoTransitionDuration = 10;
      instance.autoTransitionDuration = autoTransitionDuration;
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 0);
      clock.tick(autoTransitionDuration);
      assert.strictEqual(next.callCount, 1);

      instance.autoTransitionDuration = undefined;
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 1);
      clock.tick(0);
      assert.strictEqual(next.callCount, 2);
    });

    it('should return props.timeout when timeout is number', () => {
      const timeout = 10;
      const wrapper = shallow(<Collapse {...props} timeout={timeout} />);
      assert.strictEqual(wrapper.props().timeout, timeout);
      instance = wrapper.instance();

      const next = spy();
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 0);
      clock.tick(timeout);
      assert.strictEqual(next.callCount, 0);
    });
  });

  describe('mount', () => {
    let mount;
    let mountInstance;

    before(() => {
      mount = createMount();
      const CollapseNaked = unwrap(Collapse);
      mountInstance = mount(<CollapseNaked classes={{}} theme={{}} />).instance();
    });

    after(() => {
      mount.cleanUp();
    });

    it('instance should have a wrapper property', () => {
      assert.notStrictEqual(mountInstance.wrapper, undefined);
    });
  });

  describe('prop: collapsedHeight', () => {
    const collapsedHeight = '10px';

    it('should work when closed', () => {
      const wrapper = shallow(<Collapse {...props} collapsedHeight={collapsedHeight} />);
      const child = new ReactWrapper(wrapper.props().children('entered'));
      assert.strictEqual(child.props().style.minHeight, collapsedHeight);
    });

    it('should be taken into account in handleExiting', () => {
      const wrapper = shallow(<Collapse {...props} collapsedHeight={collapsedHeight} />);
      const instance = wrapper.instance();
      const element = { style: { height: 666, transitionDuration: undefined } };
      instance.handleExiting(element);
      assert.strictEqual(element.style.height, collapsedHeight, 'should have 0px height');
    });
  });
});
