import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { act, createRenderer, RenderCounter, screen, waitFor } from '@mui/internal-test-utils';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const setScroll = (y) => {
  return act(() => {
    window.pageYOffset = y;
    window.dispatchEvent(new window.Event('scroll', {}));
  });
};

describe('useScrollTrigger', () => {
  const { render } = createRenderer();

  describe('defaultTrigger', () => {
    it('should be false by default', () => {
      const getRenderCountRef = React.createRef();
      function TestDefault() {
        const trigger = useScrollTrigger();
        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="trigger">{`${trigger}`}</span>
          </RenderCounter>
        );
      }

      render(<TestDefault />);

      expect(screen.getByTestId('trigger').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(1);
    });

    it('should be false by default when using ref', () => {
      const getRenderCountRef = React.createRef();
      const triggerRef = React.createRef();
      function TestDefaultWithRef() {
        const [container, setContainer] = React.useState();
        const trigger = useScrollTrigger({
          target: container,
        });
        return (
          <RenderCounter ref={getRenderCountRef}>
            <span ref={triggerRef}>{`${trigger}`}</span>
            <span ref={setContainer} />
          </RenderCounter>
        );
      }
      render(<TestDefaultWithRef />);
      expect(triggerRef.current.textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(2);
    });

    it('should do nothing when ref is null', () => {
      const getRenderCountRef = React.createRef();
      const triggerRef = React.createRef();
      function TestWithNullRef() {
        const [container, setContainer] = React.useState(null);
        const trigger = useScrollTrigger({
          target: container,
        });
        return (
          <RenderCounter ref={getRenderCountRef}>
            <span ref={triggerRef}>{`${trigger}`}</span>
            <span ref={setContainer} />
          </RenderCounter>
        );
      }
      render(<TestWithNullRef />);
      expect(triggerRef.current.textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(2);
    });
  });

  describe('scroll', () => {
    const triggerRef = React.createRef();
    const containerRef = React.createRef(); // Get the scroll container's parent
    const getContainer = () => containerRef.current.children[0]; // Get the scroll container
    const getTriggerValue = () => triggerRef.current.textContent; // Retrieve the trigger value

    function Test(props) {
      const { customContainer, ...other } = props;
      const [container, setContainer] = React.useState();
      const trigger = useScrollTrigger({ ...other, target: container });

      return (
        <React.Fragment>
          <span ref={triggerRef}>{`${trigger}`}</span>
          <div ref={containerRef}>
            <Container ref={customContainer ? setContainer : null}>
              <Box sx={{ my: 2 }}>Custom container</Box>
            </Container>
          </div>
        </React.Fragment>
      );
    }

    Test.propTypes = {
      customContainer: PropTypes.bool,
    };

    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    function dispatchScroll(offset, element = window) {
      act(() => {
        element.pageYOffset = offset;
        element.dispatchEvent(new window.Event('scroll', {}));
      });
    }

    it('scroll container should render with ref', () => {
      const { container } = render(<Test customContainer />);
      expect(container.textContent).to.include('Custom container');
    });

    it('should not trigger from window scroll events with ref', () => {
      render(<Test customContainer />);
      [101, 200, 300, -10, 100, 101, 99, 200, 199, 0, 1, -1, 150].forEach((offset, i) => {
        dispatchScroll(offset);
        expect(getTriggerValue()).to.equal('false', `Index: ${i} Offset: ${offset}`);
      });
    });

    it('should trigger above default threshold with ref', () => {
      render(<Test customContainer />);
      dispatchScroll(300, getContainer());
      expect(getTriggerValue()).to.equal('true');
    });

    it('should have correct hysteresis triggering threshold with ref', () => {
      render(<Test customContainer />);
      [
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 102, result: 'true' },
        { offset: 101, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 102, result: 'true' },
        { offset: -3, result: 'false' },
        { offset: 3, result: 'false' },
        { offset: 103, result: 'true' },
        { offset: 102, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with default threshold with ref', () => {
      render(<Test customContainer disableHysteresis />);
      [
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 9999, result: 'true' },
        { offset: 0, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 102, result: 'true' },
        { offset: -3, result: 'false' },
        { offset: 3, result: 'false' },
        { offset: 103, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with custom threshold with ref', () => {
      render(<Test customContainer disableHysteresis threshold={50} />);
      [
        { offset: 100, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 9999, result: 'true' },
        { offset: 51, result: 'true' },
        { offset: 50, result: 'false' },
        { offset: 49, result: 'false' },
        { offset: 50, result: 'false' },
        { offset: 51, result: 'true' },
        { offset: 49, result: 'false' },
        { offset: 150, result: 'true' },
        { offset: -50, result: 'false' },
        { offset: 50, result: 'false' },
        { offset: 51, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with ref', () => {
      render(<Test customContainer threshold={100} />);
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with hysteresis disabled with ref', () => {
      render(<Test customContainer disableHysteresis threshold={100} />);
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets with ref', () => {
      render(<Test customContainer threshold={199} />);
      [
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets and hysteresis disabled with ref', () => {
      render(<Test customContainer disableHysteresis threshold={199} />);
      [
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate scroll events on page first load', () => {
      [
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
      ].forEach((test, index) => {
        window.pageYOffset = test.offset;
        render(<Test threshold={100} />);
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });
  });

  describe('with enableReentrantLock', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    it('should prevent rapid oscillation when enableReentrantLock is true', async () => {
      function TestComponent() {
        const trigger = useScrollTrigger({
          enableReentrantLock: true,
          reentrantLockDuration: 100,
        });

        return <span data-testid="trigger">{`${trigger}`}</span>;
      }

      render(<TestComponent />);
      expect(screen.getByTestId('trigger').textContent).to.equal('false');

      setScroll(101);
      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      setScroll(99);
      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      await waitFor(
        () => {
          setScroll(99);
          expect(screen.getByTestId('trigger').textContent).to.equal('false');
        },
        { timeout: 110 },
      );
    });

    it('should clean up timeout on unmount when enableReentrantLock is true', () => {
      const timeoutSpy = { current: null };

      function TestComponent() {
        const trigger = useScrollTrigger({
          enableReentrantLock: true,
          reentrantLockDuration: 1000, // Long duration to ensure timeout is active
        });

        // Expose the timeout ref for testing (in real code this wouldn't be needed)
        React.useEffect(() => {
          // Trigger a scroll to start the lock timer
          if (trigger) {
            timeoutSpy.current = 'active';
          }
        }, [trigger]);

        return <span data-testid="trigger">{`${trigger}`}</span>;
      }

      const { unmount } = render(<TestComponent />);

      // Trigger the lock by scrolling past threshold
      setScroll(101);
      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Try to scroll back - should still be locked
      setScroll(99);
      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Unmount while lock is active
      unmount();

      // After unmount, the timeout should be cleared and not cause any errors
      // This test passes if no errors are thrown during unmount
    });
  });
});
