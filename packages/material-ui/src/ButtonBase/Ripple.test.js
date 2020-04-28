import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import TouchRipple from './TouchRipple';
import Ripple from './Ripple';

describe('<Ripple />', () => {
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TouchRipple />);
  });

  it('should have the ripple className', () => {
    const { container } = render(
      <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} />,
    );
    const ripple = container.querySelector('span');
    expect(ripple).to.have.class(classes.ripple);
    expect(ripple).not.to.have.class(classes.fast);
  });

  describe('starting and stopping', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} />,
      );
    });

    it('should start the ripple', () => {
      wrapper.setProps({ in: true });
      const ripple = wrapper.container.querySelector('span');
      expect(ripple).to.have.class(classes.rippleVisible);
    });

    it('should stop the ripple', () => {
      wrapper.setProps({ in: true });
      wrapper.setProps({ in: false });
      const child = wrapper.container.querySelector('span > span');
      expect(child).to.have.class(classes.childLeaving);
    });
  });

  describe('pulsating and stopping 1', () => {
    let wrapper;

    before(() => {
      wrapper = render(
        <Ripple
          classes={classes}
          timeout={0}
          in={false}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );
    });

    it('should render the ripple inside a pulsating Ripple', () => {
      const ripple = wrapper.container.querySelector('span');
      expect(ripple).to.have.class(classes.ripple);
      expect(ripple).to.have.class(classes.ripplePulsate);
      const child = wrapper.container.querySelector('span > span');
      expect(child).to.have.class(classes.childPulsate);
    });

    it('should start the ripple', () => {
      wrapper.setProps({ in: true });
      const ripple = wrapper.container.querySelector('span');
      expect(ripple).to.have.class(classes.rippleVisible);
      const child = wrapper.container.querySelector('span > span');
      expect(child).to.have.class(classes.childPulsate);
    });

    it('should stop the ripple', () => {
      wrapper.setProps({ in: true });
      wrapper.setProps({ in: false });
      const child = wrapper.container.querySelector('span > span');
      expect(child).to.have.class(classes.childLeaving);
    });
  });

  describe('pulsating and stopping 2', () => {
    let wrapper;
    let clock;
    let callbackSpy;

    beforeEach(() => {
      callbackSpy = spy();
      wrapper = render(
        <Ripple
          classes={classes}
          timeout={550}
          in
          onExited={callbackSpy}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('handleExit should trigger a timer', () => {
      wrapper.setProps({ in: false });
      clock.tick(549);
      expect(callbackSpy.callCount).to.equal(0);
      clock.tick(1);
      expect(callbackSpy.callCount).to.equal(1);
    });

    it('unmount should defuse the handleExit timer', () => {
      wrapper.setProps({ in: false });
      wrapper.unmount();
      clock.tick(550);
      expect(callbackSpy.callCount).to.equal(0);
    });
  });
});
