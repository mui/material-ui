import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { Transition } from 'react-transition-group';
import Fade from './Fade';

describe('<Fade />', () => {
  const mount = createMount({ strict: true });

  const defaultProps = {
    in: true,
    children: <div />,
  };

  describeConformance(<Fade {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: Transition,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // TODO: really?
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  describe('transition lifecycle', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('calls the appropriate callbacks for each transition', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();

      const wrapper = mount(
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
      const child = wrapper.find('#test');

      wrapper.setProps({ in: true });

      expect(handleEnter.callCount).to.equal(1);
      expect(handleEnter.args[0][0]).to.equal(child.instance());
      expect(handleEnter.args[0][0].style.transition).to.match(
        /opacity 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child.instance());

      clock.tick(1000);
      expect(handleEntered.callCount).to.equal(1);
      expect(handleEntered.args[0][0]).to.equal(child.instance());

      wrapper.setProps({ in: false });

      expect(handleExit.callCount).to.equal(1);
      expect(handleExit.args[0][0]).to.equal(child.instance());

      expect(handleExit.args[0][0].style.transition).to.match(
        /opacity 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child.instance());

      clock.tick(1000);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child.instance());
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
