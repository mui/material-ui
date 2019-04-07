import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
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

  describeConformance(
    <Zoom in>
      <div />
    </Zoom>,
    () => ({
      classes: {},
      inheritComponent: 'Transition',
      mount,
      skip: ['refForwarding'],
      testComponentPropWith: false,
    }),
  );

  describe('event callbacks', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    describe('entering', () => {
      it('should fire callbacks', () => {
        const handleEnter = spy();
        const handleEntering = spy();
        const handleEntered = spy();

        mount(
          <Zoom
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            {...defaultProps}
          >
            <div />
          </Zoom>,
        );

        assert.strictEqual(handleEnter.callCount, 1);
        assert.strictEqual(handleEnter.args[0].length, 1);
        assert.strictEqual(handleEntering.callCount, 1);
        assert.strictEqual(handleEntering.args[0].length, 2);
        clock.tick(1000);
        assert.strictEqual(handleEntered.callCount, 1);
        assert.strictEqual(handleEntered.args[0].length, 2);
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', () => {
        const handleExit = spy();
        const handleExiting = spy();
        const handleExited = spy();

        const wrapper = mount(
          <Zoom
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}
            {...defaultProps}
          >
            <div />
          </Zoom>,
        );

        wrapper.setProps({
          in: false,
        });

        assert.strictEqual(handleExit.callCount, 1);
        assert.strictEqual(handleExit.args[0].length, 1);
        assert.strictEqual(handleExiting.callCount, 1);
        assert.strictEqual(handleExiting.args[0].length, 1);
        clock.tick(1000);
        assert.strictEqual(handleExited.callCount, 1);
        assert.strictEqual(handleExited.args[0].length, 1);
      });
    });
  });

  describe('transition lifecycle', () => {
    describe('handleEnter()', () => {
      it('should set the style properties', () => {
        const handleEnter = spy();
        mount(<Zoom {...defaultProps} onEnter={handleEnter} />);

        assert.match(
          handleEnter.args[0][0].style.transition,
          /transform 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      });
    });

    describe('handleExit()', () => {
      it('should set the style properties', () => {
        const handleExit = spy();
        const wrapper = mount(<Zoom {...defaultProps} onExit={handleExit} />);

        wrapper.setProps({
          in: false,
        });

        assert.match(
          handleExit.args[0][0].style.transition,
          /transform 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
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
