import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import Fade from './Fade';

describe('<Fade />', () => {
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

  describeConformance(<Fade {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'Transition',
    mount,
    skip: ['refForwarding'],
    testComponentPropWith: false,
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', done => {
        const handleEnter = spy();
        const handleEntering = spy();

        mount(
          <Fade
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
          </Fade>,
        );
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', done => {
        const handleExit = spy();
        const handleExiting = spy();

        const wrapper = mount(
          <Fade
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
          </Fade>,
        );

        wrapper.setProps({
          in: false,
        });
      });
    });
  });

  describe('transition lifecycle', () => {
    describe('handleEnter()', () => {
      it('should set style properties', () => {
        mount(
          <Fade
            {...defaultProps}
            onEnter={node => {
              // Needs to be match because Edge doesn't include the 0ms delay
              assert.match(
                node.style.transition,
                /opacity 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
              );
            }}
          />,
        );
      });
    });

    describe('handleExit()', () => {
      it('should set style properties', () => {
        const wrapper = mount(
          <Fade
            {...defaultProps}
            onExit={node => {
              // Needs to be match because Edge doesn't include the 0ms delay
              assert.match(
                node.style.transition,
                /opacity 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
              );
            }}
          />,
        );

        wrapper.setProps({
          in: false,
        });
      });
    });
  });

  describe('prop: appear', () => {
    it('should work when initially hidden, appear=true', () => {
      const wrapper = mount(
        <Fade in={false} appear>
          <div>Foo</div>
        </Fade>,
      );
      assert.deepEqual(wrapper.find('div').props().style, {
        opacity: 0,
        visibility: 'hidden',
      });
    });

    it('should work when initially hidden, appear=false', () => {
      const wrapper = mount(
        <Fade in={false} appear={false}>
          <div>Foo</div>
        </Fade>,
      );
      assert.deepEqual(wrapper.find('div').props().style, {
        opacity: 0,
        visibility: 'hidden',
      });
    });
  });
});
