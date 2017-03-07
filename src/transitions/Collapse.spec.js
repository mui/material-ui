// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import Collapse, { styleSheet } from './Collapse';

describe('<Collapse />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Collapse />);
    assert.strictEqual(wrapper.name(), 'Transition');
  });

  it('should render a container around the wrapper', () => {
    const wrapper = shallow(<Collapse classes={{ container: 'woof' }} />);
    assert.strictEqual(wrapper.childAt(0).is('div'), true, 'should be a div');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.container),
      true,
      'should have the container class',
    );
    assert.strictEqual(wrapper.childAt(0).hasClass('woof'), true, 'should have the user class');
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const wrapper = shallow(<Collapse>{children}</Collapse>);
    assert.strictEqual(wrapper.childAt(0).childAt(0).is('div'), true, 'should be a div');
    assert.strictEqual(
      wrapper.childAt(0).childAt(0).children().equals(children),
      true,
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

      const wrapper = shallow(<Collapse {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { style: {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Collapse />);
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
        element = { style: { height: heightMock } };
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

      describe('transitionDuration', () => {
        let styleManagerMock;
        let transitionDurationMock;

        before(() => {
          styleManagerMock = wrapper.context('styleManager');
          styleManagerMock.theme.transitions.getAutoHeightDuration = stub().returns('woof');
          wrapper.setContext({ styleManager: styleManagerMock });
          wrapper.setProps({ transitionDuration: 'auto' });
          instance = wrapper.instance();
        });

        it('no wrapper', () => {
          instance.wrapper = false;
          instance.handleEntering(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${styleManagerMock.theme.transitions.getAutoHeightDuration(0)}ms`,
          );
        });

        it('has wrapper', () => {
          const clientHeightMock = 10;
          instance.wrapper = { clientHeight: clientHeightMock };
          instance.handleEntering(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${styleManagerMock.theme.transitions.getAutoHeightDuration(clientHeightMock)}ms`,
          );
        });

        it('number should set transitionDuration to ms', () => {
          transitionDurationMock = 3;
          wrapper.setProps({ transitionDuration: transitionDurationMock });
          instance = wrapper.instance();
          instance.handleEntering(element);

          assert.strictEqual(element.style.transitionDuration, `${transitionDurationMock}ms`);
        });

        it('string should set transitionDuration to string', () => {
          transitionDurationMock = 'woof';
          wrapper.setProps({ transitionDuration: transitionDurationMock });
          instance = wrapper.instance();
          instance.handleEntering(element);

          assert.strictEqual(element.style.transitionDuration, transitionDurationMock);
        });

        it('nothing should not set transitionDuration', () => {
          const elementBackup = element;
          wrapper.setProps({ transitionDuration: undefined });
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
        handleEnteredWrapper = shallow(<Collapse />);
        onEnteredSpy = spy();
        handleEnteredWrapper.setProps({ onEntered: onEnteredSpy });
        handleEnteredInstance = handleEnteredWrapper.instance();
        element = { style: { height: 666, transitionDuration: '500ms' } };
        handleEnteredInstance.handleEntered(element);
      });

      it('should set element transition duration to 0 to fix a safari bug', () => {
        assert.strictEqual(element.style.transitionDuration, '0ms', 'should have 0ms duration');
      });

      it('should set height to auto', () => {
        assert.strictEqual(element.style.height, 'auto', 'should have auto height');
      });

      it('should have called onEntered', () => {
        assert.strictEqual(onEnteredSpy.callCount, 1, 'should have called props.onEntered');
      });
    });

    describe('handleExit()', () => {
      let element;

      before(() => {
        element = { style: { height: 'auto' } };
        instance.wrapper = { clientHeight: 666 };
        instance.handleExit(element);
      });

      it('should set height to the wrapper height', () => {
        assert.strictEqual(element.style.height, '666px', 'should have 666px height');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = { style: { height: 666 } };
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

      describe('transitionDuration', () => {
        let styleManagerMock;
        let transitionDurationMock;

        before(() => {
          styleManagerMock = wrapper.context('styleManager');
          styleManagerMock.theme.transitions.getAutoHeightDuration = stub().returns('woof');
          wrapper.setContext({ styleManager: styleManagerMock });
          wrapper.setProps({ transitionDuration: 'auto' });
          instance = wrapper.instance();
        });

        it('no wrapper', () => {
          instance.wrapper = false;
          instance.handleExiting(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${styleManagerMock.theme.transitions.getAutoHeightDuration(0)}ms`,
          );
        });

        it('has wrapper', () => {
          const clientHeightMock = 10;
          instance.wrapper = { clientHeight: clientHeightMock };
          instance.handleExiting(element);
          assert.strictEqual(
            element.style.transitionDuration,
            `${styleManagerMock.theme.transitions.getAutoHeightDuration(clientHeightMock)}ms`,
          );
        });

        it('number should set transitionDuration to ms', () => {
          transitionDurationMock = 3;
          wrapper.setProps({ transitionDuration: transitionDurationMock });
          instance = wrapper.instance();
          instance.handleExiting(element);

          assert.strictEqual(element.style.transitionDuration, `${transitionDurationMock}ms`);
        });

        it('string should set transitionDuration to string', () => {
          transitionDurationMock = 'woof';
          wrapper.setProps({ transitionDuration: transitionDurationMock });
          instance = wrapper.instance();
          instance.handleExiting(element);

          assert.strictEqual(element.style.transitionDuration, transitionDurationMock);
        });

        it('nothing should not set transitionDuration', () => {
          const elementBackup = element;
          wrapper.setProps({ transitionDuration: undefined });
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

  describe('mount', () => {
    let mount;
    let mountInstance;

    before(() => {
      mount = createMount();
      mountInstance = mount(<Collapse.Naked classes={classes} />).instance();
    });

    after(() => {
      mount.cleanUp();
    });

    it('instance should have a wrapper property', () => {
      assert.notStrictEqual(mountInstance.wrapper, undefined);
    });
  });
});
