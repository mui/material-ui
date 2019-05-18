import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Snackbar from './Snackbar';
import Grow from '../Grow';

describe('<Snackbar />', () => {
  let mount;
  let classes;

  before(() => {
    classes = getClasses(<Snackbar open />);
    // StrictModeViolation: uses Slide
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Snackbar open message="message" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  describe('prop: onClose', () => {
    it('should be call when clicking away', () => {
      const handleClose = spy();
      mount(<Snackbar open onClose={handleClose} message="message" />);

      const event = new window.Event('click', { view: window, bubbles: true, cancelable: true });
      window.document.body.dispatchEvent(event);

      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [event, 'clickaway']);
    });
  });

  describe('Consecutive messages', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should support synchronous onExited callback', () => {
      const messageCount = 2;
      let wrapper;
      const handleCloseSpy = spy();
      const handleClose = () => {
        wrapper.setProps({ open: false });
        handleCloseSpy();
      };
      const handleExitedSpy = spy();
      const handleExited = () => {
        handleExitedSpy();
        if (handleExitedSpy.callCount < messageCount) {
          wrapper.setProps({ open: true });
        }
      };
      const duration = 250;
      wrapper = mount(
        <Snackbar
          open={false}
          onClose={handleClose}
          onExited={handleExited}
          message="message"
          autoHideDuration={duration}
          transitionDuration={duration / 2}
        />,
      );
      assert.strictEqual(handleCloseSpy.callCount, 0);
      assert.strictEqual(handleExitedSpy.callCount, 0);
      wrapper.setProps({ open: true });
      clock.tick(duration);
      assert.strictEqual(handleCloseSpy.callCount, 1);
      assert.strictEqual(handleExitedSpy.callCount, 0);
      clock.tick(duration / 2);
      assert.strictEqual(handleCloseSpy.callCount, 1);
      assert.strictEqual(handleExitedSpy.callCount, 1);
      clock.tick(duration);
      assert.strictEqual(handleCloseSpy.callCount, messageCount);
      assert.strictEqual(handleExitedSpy.callCount, 1);
      clock.tick(duration / 2);
      assert.strictEqual(handleCloseSpy.callCount, messageCount);
      assert.strictEqual(handleExitedSpy.callCount, messageCount);
    });
  });

  describe('prop: autoHideDuration', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should call onClose when the timer is done', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const wrapper = mount(
        <Snackbar
          open={false}
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      wrapper.setProps({ open: true });
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration);
      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });

    it('should not call onClose when the autoHideDuration is reset', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const wrapper = mount(
        <Snackbar
          open={false}
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      wrapper.setProps({ open: true });
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration / 2);
      wrapper.setProps({ autoHideDuration: undefined });
      clock.tick(autoHideDuration / 2);
      assert.strictEqual(handleClose.callCount, 0);
    });

    it('should be able to interrupt the timer', () => {
      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const wrapper = mount(
        <Snackbar
          open
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      assert.strictEqual(handleMouseEnter.callCount, 1, 'should trigger mouse enter callback');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');
      assert.strictEqual(handleMouseLeave.callCount, 1, 'should trigger mouse leave callback');
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(2e3);
      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });

    it('should not call onClose if autoHideDuration is undefined', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      mount(<Snackbar open onClose={handleClose} message="message" autoHideDuration={undefined} />);

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration);
      assert.strictEqual(handleClose.callCount, 0);
    });

    it('should not call onClose if autoHideDuration is null', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      mount(<Snackbar open onClose={handleClose} message="message" autoHideDuration={null} />);

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration);
      assert.strictEqual(handleClose.callCount, 0);
    });

    it('should not call onClose when closed', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const wrapper = mount(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration / 2);
      wrapper.setProps({ open: false });
      clock.tick(autoHideDuration / 2);
      assert.strictEqual(handleClose.callCount, 0);
    });
  });

  describe('prop: resumeHideDuration', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should not call onClose with not timeout after user interaction', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const resumeHideDuration = 3e3;
      const wrapper = mount(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
          resumeHideDuration={resumeHideDuration}
        />,
      );
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(2e3);
      assert.strictEqual(handleClose.callCount, 0);
    });

    it('should call onClose when timer done after user interaction', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const resumeHideDuration = 3e3;
      const wrapper = mount(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
          resumeHideDuration={resumeHideDuration}
        />,
      );
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');
      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(resumeHideDuration);
      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });

    it('should call onClose immediately after user interaction when 0', () => {
      const handleClose = spy();
      const autoHideDuration = 6e3;
      const resumeHideDuration = 0;
      const wrapper = mount(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
          resumeHideDuration={resumeHideDuration}
        />,
      );
      wrapper.setProps({ open: true });
      assert.strictEqual(handleClose.callCount, 0);
      wrapper.simulate('mouseEnter');
      clock.tick(100);
      wrapper.simulate('mouseLeave');
      clock.tick(resumeHideDuration);
      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
  });

  describe('prop: disableWindowBlurListener', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should pause auto hide when not disabled and window lost focus', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      mount(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
          disableWindowBlurListener={false}
        />,
      );

      const bEvent = new window.Event('blur', { view: window, bubbles: false, cancelable: false });
      window.dispatchEvent(bEvent);

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration);
      assert.strictEqual(handleClose.callCount, 0);

      const fEvent = new window.Event('focus', { view: window, bubbles: false, cancelable: false });
      window.dispatchEvent(fEvent);

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration);
      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });

    it('should not pause auto hide when disabled and window lost focus', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      mount(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
          disableWindowBlurListener
        />,
      );

      const event = new window.Event('blur', { view: window, bubbles: false, cancelable: false });
      window.dispatchEvent(event);

      assert.strictEqual(handleClose.callCount, 0);
      clock.tick(autoHideDuration);
      assert.strictEqual(handleClose.callCount, 1);
      assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
  });

  describe('prop: open', () => {
    it('should not render anything when closed', () => {
      const wrapper = mount(<Snackbar open={false} message="Hello, World!" />);
      assert.strictEqual(wrapper.text(), null);
    });

    it('should be able show it after mounted', () => {
      const wrapper = mount(<Snackbar open={false} message="Hello, World!" />);
      assert.strictEqual(wrapper.text(), null);
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.text(), 'Hello, World!');
    });
  });

  describe('prop: children', () => {
    it('should render the children', () => {
      const children = <div />;
      const wrapper = mount(<Snackbar open>{children}</Snackbar>);
      assert.strictEqual(wrapper.containsMatchingElement(children), true);
    });
  });

  describe('prop: TransitionComponent', () => {
    it('should use a Grow by default', () => {
      const wrapper = mount(<Snackbar open message="message" />);
      assert.strictEqual(wrapper.find(Grow).exists(), true);
    });

    it('accepts a different component that handles the transition', () => {
      const Transition = () => <div className="cloned-element-class" />;
      const wrapper = mount(<Snackbar open TransitionComponent={Transition} />);
      assert.strictEqual(wrapper.find(Transition).exists(), true);
    });
  });
});
