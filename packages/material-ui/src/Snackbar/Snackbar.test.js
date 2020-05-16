import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Snackbar from './Snackbar';

describe('<Snackbar />', () => {
  // StrictModeViolation: uses Slide
  const mount = createMount({ strict: false });
  let classes;
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Snackbar open />);
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
      render(<Snackbar open onClose={handleClose} message="message" />);

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
      let view;
      const handleCloseSpy = spy();
      const handleClose = () => {
        view.setProps({ open: false });
        handleCloseSpy();
      };
      const handleExitedSpy = spy();
      const handleExited = () => {
        handleExitedSpy();
        if (handleExitedSpy.callCount < messageCount) {
          view.setProps({ open: true });
        }
      };
      const duration = 250;
      view = render(
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
      view.setProps({ open: true });
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
      const { setProps } = render(
        <Snackbar
          open={false}
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      setProps({ open: true });
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
      const { setProps } = render(
        <Snackbar
          open={false}
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      setProps({ open: true });
      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      setProps({ autoHideDuration: undefined });
      clock.tick(autoHideDuration / 2);
      expect(handleClose.callCount).to.equal(0);
    });

    it('should be able to interrupt the timer', () => {
      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const { container } = render(
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
      fireEvent.mouseEnter(container.querySelector('div'));
      expect(handleMouseEnter.callCount).to.equal(1);
      clock.tick(autoHideDuration / 2);
      fireEvent.mouseLeave(container.querySelector('div'));
      expect(handleMouseLeave.callCount).to.equal(1);
      expect(handleClose.callCount).to.equal(0);
      clock.tick(2e3);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
    });

    it('should not call onClose if autoHideDuration is undefined', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      render(
        <Snackbar open onClose={handleClose} message="message" autoHideDuration={undefined} />,
      );

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(0);
    });

    it('should not call onClose if autoHideDuration is null', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      render(<Snackbar open onClose={handleClose} message="message" autoHideDuration={null} />);

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration);
      expect(handleClose.callCount).to.equal(0);
    });

    it('should not call onClose when closed', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const { setProps } = render(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
        />,
      );

      expect(handleClose.callCount).to.equal(0);
      clock.tick(autoHideDuration / 2);
      setProps({ open: false });
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
      const { container } = render(
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
      fireEvent.mouseEnter(container.querySelector('div'));
      clock.tick(autoHideDuration / 2);
      fireEvent.mouseLeave(container.querySelector('div'));
      expect(handleClose.callCount).to.equal(0);
      clock.tick(2e3);
      expect(handleClose.callCount).to.equal(0);
    });

    it('should call onClose when timer done after user interaction', () => {
      const handleClose = spy();
      const autoHideDuration = 2e3;
      const resumeHideDuration = 3e3;
      const { container } = render(
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
      fireEvent.mouseEnter(container.querySelector('div'));
      clock.tick(autoHideDuration / 2);
      fireEvent.mouseLeave(container.querySelector('div'));
      expect(handleClose.callCount).to.equal(0);
      clock.tick(resumeHideDuration);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0]).to.deep.equal([null, 'timeout']);
    });

    it('should call onClose immediately after user interaction when 0', () => {
      const handleClose = spy();
      const autoHideDuration = 6e3;
      const resumeHideDuration = 0;
      const { setProps, container } = render(
        <Snackbar
          open
          onClose={handleClose}
          message="message"
          autoHideDuration={autoHideDuration}
          resumeHideDuration={resumeHideDuration}
        />,
      );
      setProps({ open: true });
      expect(handleClose.callCount).to.equal(0);
      fireEvent.mouseEnter(container.querySelector('div'));
      clock.tick(100);
      fireEvent.mouseLeave(container.querySelector('div'));
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
      render(
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
      render(
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
      const { container } = render(<Snackbar open={false} message="Hello, World!" />);
      expect(container).to.have.text('');
    });

    it('should be able show it after mounted', () => {
      const { container, setProps } = render(<Snackbar open={false} message="Hello, World!" />);
      expect(container).to.have.text('');
      setProps({ open: true });
      expect(container).to.have.text('Hello, World!');
    });
  });

  describe('prop: children', () => {
    it('should render the children', () => {
      const nodeRef = React.createRef();
      const children = <div ref={nodeRef} />;
      const { container } = render(<Snackbar open>{children}</Snackbar>);
      expect(container).to.contain(nodeRef.current);
    });
  });

  describe('prop: TransitionComponent', () => {
    it('should use a Grow by default', () => {
      const childRef = React.createRef();
      render(
        <Snackbar open message="message">
          <div ref={childRef} />
        </Snackbar>,
      );
      expect(childRef.current.style.transform).to.contain('scale');
    });

    it('accepts a different component that handles the transition', () => {
      const transitionRef = React.createRef();
      const Transition = () => <div className="cloned-element-class" ref={transitionRef} />;
      const { container } = render(<Snackbar open TransitionComponent={Transition} />);
      expect(container).to.contain(transitionRef.current);
    });
  });
});
