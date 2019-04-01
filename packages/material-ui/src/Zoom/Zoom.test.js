import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import Zoom from './Zoom';

describe('<Zoom />', () => {
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
    const wrapper = mount(<Zoom {...defaultProps} />);
    assert.strictEqual(wrapper.find('Transition').exists(), true);
  });

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', done => {
        const handleEnter = spy();
        const handleEntering = spy();

        mount(
          <Zoom
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
          </Zoom>,
        );
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', done => {
        const handleExit = spy();
        const handleExiting = spy();

        const wrapper = mount(
          <Zoom
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
          </Zoom>,
        );

        wrapper.setProps({
          in: false,
        });
      });
    });
  });

  describe('transition lifecycle', () => {
    describe('handleEnter()', () => {
      it('should set the style properties', () => {
        mount(
          <Zoom
            {...defaultProps}
            onEnter={node => {
              assert.match(
                node.style.transition,
                /transform 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
              );
            }}
          />,
        );
      });
    });

    describe('handleExit()', () => {
      it('should set the style properties', () => {
        const wrapper = mount(
          <Zoom
            {...defaultProps}
            onExit={node => {
              assert.match(
                node.style.transition,
                /transform 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
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
    it('should work when initially hidden: appear=true', () => {
      const wrapper = mount(
        <Zoom in={false} appear>
          <div>Foo</div>
        </Zoom>,
      );
      assert.deepEqual(wrapper.find('div').props().style, {
        transform: 'scale(0)',
        visibility: 'hidden',
      });
    });

    it('should work when initially hidden: appear=false', () => {
      const wrapper = mount(
        <Zoom in={false} appear={false}>
          <div>Foo</div>
        </Zoom>,
      );
      assert.deepEqual(wrapper.find('div').props().style, {
        transform: 'scale(0)',
        visibility: 'hidden',
      });
    });
  });
});
