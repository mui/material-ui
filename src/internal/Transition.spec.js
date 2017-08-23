// @flow weak

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '../test-utils';
import Transition, { UNMOUNTED, EXITED, ENTERING, ENTERED, EXITING } from './Transition';

describe('<Transition />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should not transition on mount', () => {
    const wrapper = mount(
      <Transition in timeout={0} onEnter={() => assert.fail()}>
        <div />
      </Transition>,
    );
    assert.strictEqual(wrapper.state('status'), ENTERED);
  });

  it('should start exited with transitionAppear', () => {
    const wrapper = mount(
      <Transition transitionAppear>
        <div />
      </Transition>,
    );
    assert.strictEqual(wrapper.state('status'), EXITED);
  });

  it('should transition on mount with transitionAppear', () => {
    const wrapper = mount(
      <Transition in transitionAppear timeout={0}>
        <div />
      </Transition>,
    );
    assert.strictEqual(wrapper.state('status'), ENTERING);
  });

  it('should flush new props to the DOM before initiating a transition', done => {
    const wrapper = mount(
      <Transition
        in={false}
        timeout={0}
        enteringClassName="test-entering"
        onEnter={node => {
          assert.strictEqual(
            node.classList.contains('test-class'),
            true,
            'should have the test-class',
          );
          assert.strictEqual(
            node.classList.contains('test-entering'),
            false,
            'should not have the test-entering class',
          );
          done();
        }}
      >
        <div />
      </Transition>,
    );

    assert.strictEqual(wrapper.hasClass('test-class'), false, 'should not have the test-class yet');

    wrapper.setProps({ in: true, className: 'test-class' });
  });

  describe('entering', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Transition timeout={10} enteredClassName="test-enter" enteringClassName="test-entering">
          <div />
        </Transition>,
      );
    });

    it('should fire callbacks', done => {
      const onEnter = spy();
      const onEntering = spy();

      assert.strictEqual(wrapper.state('status'), EXITED);

      wrapper = wrapper.setProps({
        in: true,
        onEnter,
        onEntering,
        onEntered() {
          assert.strictEqual(onEnter.callCount, 1);
          assert.strictEqual(onEntering.callCount, 1);
          assert.strictEqual(onEnter.calledBefore(onEntering), true);
          done();
        },
      });
    });

    it('should move to each transition state', done => {
      let count = 0;

      assert.strictEqual(wrapper.state('status'), EXITED);

      wrapper = wrapper.setProps({
        in: true,
        onEnter() {
          count += 1;
          assert.strictEqual(wrapper.state('status'), EXITED);
        },
        onEntering() {
          count += 1;
          assert.strictEqual(wrapper.state('status'), ENTERING);
        },
        onEntered() {
          assert.strictEqual(wrapper.state('status'), ENTERED);
          assert.strictEqual(count, 2);
          done();
        },
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      assert.strictEqual(wrapper.state('status'), EXITED);

      wrapper = wrapper.setProps({
        in: true,
        onEnter(node) {
          count += 1;
          assert.strictEqual(node.className, '');
        },
        onEntering(node) {
          count += 1;
          assert.strictEqual(node.className, 'test-entering');
        },
        onEntered(node) {
          assert.strictEqual(node.className, 'test-enter');
          assert.strictEqual(count, 2);
          done();
        },
      });
    });
  });

  describe('exiting', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Transition in timeout={10} exitedClassName="test-exit" exitingClassName="test-exiting">
          <div />
        </Transition>,
      );
    });

    it('should fire callbacks', done => {
      const onExit = spy();
      const onExiting = spy();

      assert.strictEqual(wrapper.state('status'), ENTERED);

      wrapper = wrapper.setProps({
        in: false,

        onExit,

        onExiting,

        onExited() {
          assert.strictEqual(onExit.callCount, 1);
          assert.strictEqual(onExiting.callCount, 1);
          assert.strictEqual(onExit.calledBefore(onExiting), true);
          done();
        },
      });
    });

    it('should move to each transition state', done => {
      let count = 0;

      assert.strictEqual(wrapper.state('status'), ENTERED);

      wrapper = wrapper.setProps({
        in: false,

        onExit() {
          count += 1;
          assert.strictEqual(wrapper.state('status'), ENTERED);
        },

        onExiting() {
          count += 1;
          assert.strictEqual(wrapper.state('status'), EXITING);
        },

        onExited() {
          assert.strictEqual(wrapper.state('status'), EXITED);
          assert.strictEqual(count, 2);
          done();
        },
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      assert.strictEqual(wrapper.state('status'), ENTERED);

      wrapper = wrapper.setProps({
        in: false,

        onExit(node) {
          count += 1;
          assert.strictEqual(node.className, '');
        },

        onExiting(node) {
          count += 1;
          assert.strictEqual(node.className, 'test-exiting');
        },

        onExited(node) {
          assert.strictEqual(node.className, 'test-exit');
          assert.strictEqual(count, 2);
          done();
        },
      });
    });
  });

  describe('unmountOnExit', () => {
    class UnmountTransition extends React.Component<any, any> {
      state = {};

      componentWillMount() {
        this.setState({
          in: this.props.initialIn, // eslint-disable-line react/prop-types
        });
      }

      transition = null;

      getStatus() {
        return this.transition.state.status;
      }

      render() {
        const {
          initialIn, // eslint-disable-line react/prop-types
          ...other
        } = this.props;

        return (
          <Transition
            ref={node => {
              if (node !== null) {
                this.transition = node;
              }
            }}
            unmountOnExit
            in={this.state.in}
            timeout={10}
            {...other}
          >
            <div />
          </Transition>
        );
      }
    }

    it('should mount when entering', done => {
      const wrapper = mount(
        <UnmountTransition
          initialIn={false}
          onEnter={() => {
            assert.strictEqual(wrapper.instance().getStatus(), EXITED);
            assert.ok(findDOMNode(wrapper.instance()));
            done();
          }}
        />,
      );

      assert.strictEqual(wrapper.instance().getStatus(), UNMOUNTED);
      assert.isNotOk(findDOMNode(wrapper.instance()));

      wrapper.setState({ in: true });
    });

    it('should unmount after exiting', done => {
      const wrapper = mount(
        <UnmountTransition
          initialIn
          onExited={() => {
            assert.strictEqual(wrapper.instance().getStatus(), UNMOUNTED);
            assert.isNotOk(findDOMNode(wrapper.instance()));
            done();
          }}
        />,
      );

      assert.strictEqual(wrapper.instance().getStatus(), ENTERED);
      assert.ok(findDOMNode(wrapper.instance()));

      wrapper.setState({ in: false });
    });
  });

  describe('shouldComponentUpdate', () => {
    let wrapper;
    let instance;
    let currentState;
    let nextState;
    let result;

    const nextProps = {};

    before(() => {
      wrapper = mount(
        <Transition>
          <div />
        </Transition>,
      );
    });

    it('should update', () => {
      currentState = { status: EXITED };
      wrapper.setProps({ in: true });
      nextState = currentState;
      wrapper.setState(currentState);
      instance = wrapper.instance();
      result = instance.shouldComponentUpdate(nextProps, nextState);
      assert.strictEqual(result, false);
    });

    it("shouldn't update due to prop:in being false", () => {
      currentState = { status: EXITED };
      nextState = currentState;
      wrapper.setState({ status: EXITED });
      wrapper.setProps({ in: false });
      instance = wrapper.instance();
      result = instance.shouldComponentUpdate(nextProps, nextState);
      assert.strictEqual(result, true);
    });

    it("shouldn't update due to currentState.status != EXITED", () => {
      currentState = { status: UNMOUNTED };
      wrapper.setState(currentState);
      nextState = currentState;
      wrapper.setProps({ in: true });
      instance = wrapper.instance();
      result = instance.shouldComponentUpdate(nextProps, nextState);
      assert.strictEqual(result, true);
    });

    it("shouldn't update due to currentState.status != nextState.status", () => {
      currentState = { status: EXITED };
      wrapper.setState(currentState);
      nextState = currentState;
      nextState.status = UNMOUNTED;
      wrapper.setProps({ in: true });
      instance = wrapper.instance();
      result = instance.shouldComponentUpdate(nextProps, nextState);
      assert.strictEqual(result, true);
    });
  });
});
