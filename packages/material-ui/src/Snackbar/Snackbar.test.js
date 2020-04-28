import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Snackbar from './Snackbar';
import Grow from '../Grow';

describe('<Snackbar />', () => {
  let mount;
  let classes;
  const render = createClientRender({ strict: false });

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
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  describe('prop: onClose', () => {
    it('should be call when clicking away', () => {
      const handleClose = spy();
      mount(<Snackbar open onClose={handleClose} message="message" />);

      const event = new window.Event('click', { view: window, bubbles: true, cancelable: true });
      document.body.dispatchEvent(event);

      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([event, 'clickaway']);
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
      expect(handleCloseSpy.callCount).to.equal(0);
      expect(handleExitedSpy.callCount).to.equal(0);
      wrapper.setProps({ open: true });
      clock.tick(duration);
      expect(handleCloseSpy.callCount).to.equal(1);
      expect(handleExitedSpy.callCount).to.equal(0);
      clock.tick(duration / 2);
      expect(handleCloseSpy.callCount).to.equal(1);
      expect(handleExitedSpy.callCount).to.equal(1);
      clock.tick(duration);
      expect(handleCloseSpy.callCount).to.equal(messageCount);
      expect(handleExitedSpy.callCount).to.equal(1);
      clock.tick(duration / 2);
      expect(handleCloseSpy.callCount).to.equal(messageCount);
      expect(handleExitedSpy.callCount).to.equal(messageCount);
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
      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
    });

    it('calls onClose at timeout even if the prop changes', () => {
      const handleClose1 = spy();
      const handleClose2 = spy();
      const autoHideDuration = 2e3;
      const { setProps } = render(
        <Snackbar
          open={false}
          onClose={handleClose1}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      setProps({ open: true });
      clock.tick(autoHideDuration / 2);
      setProps({ open: true, onClose: handleClose2 });
      clock.tick(autoHideDuration / 2);
      expect(handleClose1.callCount).to.equal(0);
      expect(handleClose2.callCount).to.equal(1);
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
      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      wrapper.setProps({ autoHideDuration: undefined });
      clock.tick(autoHideDuration / 2);
      expect(handleClose.callCount).to.equal(0);
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

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      expect(handleMouseEnter.callCount).to.equal(1);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');
      expect(handleMouseLeave.callCount).to.equal(1);
      expect(handleClose.callCount).to.equal(0);
      clock.tick(2e3);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
    });

    it('should not call onClose if autoHideDuration is undefined', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      mount(<Snackbar open onClose={handleClose} message="message" autoHideDuration={undefined} />);

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(0);
    });

    it('should not call onClose if autoHideDuration is null', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      mount(<Snackbar open onClose={handleClose} message="message" autoHideDuration={null} />);

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(0);
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

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      wrapper.setProps({ open: false });
      clock.tick(autoHideDuration / 2);
      expect(handleClose.callCount).to.equal(0);
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
      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');
      expect(handleClose.callCount).to.equal(0);
      clock.tick(2e3);
      expect(handleClose.callCount).to.equal(0);
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
      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');
      expect(handleClose.callCount).to.equal(0);
      clock.tick(resumeHideDuration);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
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
      expect(handleClose.callCount).to.equal(0);
      wrapper.simulate('mouseEnter');
      clock.tick(100);
      wrapper.simulate('mouseLeave');
      clock.tick(resumeHideDuration);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
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

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(0);

      const fEvent = new window.Event('focus', { view: window, bubbles: false, cancelable: false });
      window.dispatchEvent(fEvent);

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
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

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
    });
  });

  describe('prop: open', () => {
    it('should not render anything when closed', () => {
      const wrapper = mount(<Snackbar open={false} message="Hello, World!" />);
      expect(wrapper.text()).to.equal('');
    });

    it('should be able show it after mounted', () => {
      const wrapper = mount(<Snackbar open={false} message="Hello, World!" />);
      expect(wrapper.text()).to.equal('');
      wrapper.setProps({ open: true });
      expect(wrapper.text()).to.equal('Hello, World!');
    });
  });

  describe('prop: children', () => {
    it('should render the children', () => {
      const children = <div />;
      const wrapper = mount(<Snackbar open>{children}</Snackbar>);
      expect(wrapper.containsMatchingElement(children)).to.equal(true);
    });
  });

  describe('prop: TransitionComponent', () => {
    it('should use a Grow by default', () => {
      const wrapper = mount(<Snackbar open message="message" />);
      expect(wrapper.find(Grow).exists()).to.equal(true);
    });

    it('accepts a different component that handles the transition', () => {
      const Transition = () => <div className="cloned-element-class" />;
      const wrapper = mount(<Snackbar open TransitionComponent={Transition} />);
      expect(wrapper.find(Transition).exists()).to.equal(true);
    });
  });
});
