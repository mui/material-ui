import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import Grow from './Grow';

describe('<Grow />', () => {
  let mount;
  const defaultProps = {
    in: true,
    children: <div />,
  };

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Transition', () => {
    const wrapper = mount(<Grow {...defaultProps} />);
    assert.strictEqual(wrapper.find('Transition').exists(), true);
  });

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', done => {
        const handleEnter = spy();
        const handleEntering = spy();

        mount(
          <Grow
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={() => {
              assert.strictEqual(handleEnter.callCount, 1);
              assert.strictEqual(handleEnter.args[0].length, 1);
              assert.strictEqual(handleEntering.callCount, 1);
              assert.strictEqual(handleEntering.args[0].length, 2);
              done();
            }}
            {...defaultProps}
          >
            <div />
          </Grow>,
        );
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', done => {
        const handleExit = spy();
        const handleExiting = spy();

        const wrapper = mount(
          <Grow
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={() => {
              assert.strictEqual(handleExit.callCount, 1);
              assert.strictEqual(handleExit.args[0].length, 1);
              assert.strictEqual(handleExiting.callCount, 1);
              assert.strictEqual(handleExiting.args[0].length, 1);
              done();
            }}
            {...defaultProps}
          >
            <div />
          </Grow>,
        );

        wrapper.setProps({
          in: false,
        });
      });
    });
  });

  describe('prop: timeout', () => {
    const enterDuration = 556;
    const leaveDuration = 446;

    it('should create proper easeOut animation onEnter', () => {
      mount(
        <Grow
          {...defaultProps}
          timeout={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
          onEnter={node => {
            assert.match(node.style.transition, new RegExp(`${enterDuration}ms`));
          }}
        />,
      );
    });

    it('should create proper sharp animation onExit', () => {
      mount(
        <Grow
          {...defaultProps}
          timeout={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
          onExit={node => {
            assert.match(node.style.transition, new RegExp(`${leaveDuration}ms`));
          }}
        />,
      );
    });
  });

  describe('transition lifecycle', () => {
    describe('handleEnter()', () => {
      it('should set style properties', () => {
        mount(
          <Grow
            {...defaultProps}
            onEnter={node => {
              assert.match(
                node.style.transition,
                /opacity (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?,( )?transform (0ms )?cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
              );
            }}
          />,
        );
      });
    });

    describe('handleExit()', () => {
      it('should set style properties', () => {
        mount(
          <Grow
            {...defaultProps}
            onExit={node => {
              assert.strictEqual(node.style.opacity, '0', 'should be transparent');
              assert.strictEqual(
                node.style.transform,
                'scale(0.75, 0.5625)',
                'should have the exit scale',
              );
            }}
          />,
        );
      });
    });
  });

  describe('addEndListener()', () => {
    let instance;
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should return autoTransitionDuration when timeout is auto', () => {
      const wrapper = mount(<Grow {...defaultProps} timeout="auto" />);
      assert.strictEqual(wrapper.defaultProps().timeout, null);
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

    it('should return defaultProps.timeout when timeout is number', () => {
      const timeout = 10;
      const wrapper = mount(<Grow {...defaultProps} timeout={timeout} />);
      assert.strictEqual(wrapper.defaultProps().timeout, timeout);
      instance = wrapper.instance();
      const next = spy();
      instance.addEndListener(null, next);
      assert.strictEqual(next.callCount, 0);
      clock.tick(timeout);
      assert.strictEqual(next.callCount, 0);
    });
  });
});
