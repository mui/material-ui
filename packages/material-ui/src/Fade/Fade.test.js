import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Fade from './Fade';
import { Transition } from 'react-transition-group';

describe('<Fade />', () => {
  let mount;

  const defaultProps = {
    in: true,
    children: <div />,
  };

  before(() => {
    // StrictModeViolation: uses react-transition-group
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Fade {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: Transition,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  describe('transition lifecycle', () => {
    let clock;
    let wrapper;
    let child;

    const handleEnter = spy();
    const handleEntering = spy();
    const handleEntered = spy();
    const handleExit = spy();
    const handleExiting = spy();
    const handleExited = spy();

    before(() => {
      clock = useFakeTimers();
      wrapper = mount(
        <Fade
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div id="test" />
        </Fade>,
      );
      child = wrapper.find('#test');
    });

    after(() => {
      clock.restore();
    });

    describe('in', () => {
      before(() => {
        wrapper.setProps({ in: true });
      });

      describe('handleEnter()', () => {
        it('should call handleEnter()', () => {
          expect(handleEnter.callCount).to.equal(1);
          expect(handleEnter.args[0][0]).to.equal(child.instance());
        });

        it('should set style properties', () => {
          expect(handleEnter.args[0][0].style.transition).to.match(
            /opacity 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
          );
        });
      });

      describe('handleEntering()', () => {
        it('should call handleEntering()', () => {
          expect(handleEntering.callCount).to.equal(1);
          expect(handleEntering.args[0][0]).to.equal(child.instance());
        });
      });

      describe('handleEntered()', () => {
        it('should call handleEntered()', () => {
          clock.tick(1000);
          expect(handleEntered.callCount).to.equal(1);
          expect(handleEntered.args[0][0]).to.equal(child.instance());
        });
      });
    });

    describe('out', () => {
      before(() => {
        wrapper.setProps({ in: true });
        wrapper.setProps({ in: false });
      });

      describe('handleExit()', () => {
        it('should call handleExit()', () => {
          expect(handleExit.callCount).to.equal(1);
          expect(handleExit.args[0][0]).to.equal(child.instance());
        });

        it('should set style properties', () => {
          expect(handleExit.args[0][0].style.transition).to.match(
            /opacity 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
          );
        });
      });

      describe('handleExiting()', () => {
        it('should call handleExiting()', () => {
          expect(handleExiting.callCount).to.equal(1);
          expect(handleExiting.args[0][0]).to.equal(child.instance());
        });
      });

      describe('handleExited()', () => {
        it('should call handleExited()', () => {
          clock.tick(1000);
          expect(handleExited.callCount).to.equal(1);
          expect(handleExited.args[0][0]).to.equal(child.instance());
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
      expect(wrapper.find('div').props().style).to.deep.equal({
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
      expect(wrapper.find('div').props().style).to.deep.equal({
        opacity: 0,
        visibility: 'hidden',
      });
    });
  });
});
