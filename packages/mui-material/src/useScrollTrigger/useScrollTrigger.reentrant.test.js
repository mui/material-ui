import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import useScrollTrigger from '@mui/material/useScrollTrigger';

describe('useScrollTrigger - reentrant protection', () => {
  const { render } = createRenderer();

  describe('with disableReentrant', () => {
    it('should prevent rapid oscillation when disableReentrant is false', async () => {
      const triggerValues = [];

      function TestComponent() {
        const trigger = useScrollTrigger({
          threshold: 100,
          disableReentrant: false,
          reentrantLockDuration: 100,
        });

        // Track all trigger values
        React.useEffect(() => {
          triggerValues.push(trigger);
        }, [trigger]);

        return <span data-testid="trigger">{`${trigger}`}</span>;
      }

      render(<TestComponent />);

      expect(screen.getByTestId('trigger').textContent).to.equal('false');

      // Simulate rapid scroll events that would normally cause oscillation
      act(() => {
        window.pageYOffset = 101;
        window.dispatchEvent(new window.Event('scroll', {}));
      });

      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Immediately try to trigger another change (simulating feedback from DOM change)
      act(() => {
        window.pageYOffset = 99;
        window.dispatchEvent(new window.Event('scroll', {}));
      });

      // Should still be true due to lock
      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Wait for lock to expire
      await waitFor(
        () => {
          act(() => {
            window.pageYOffset = 99;
            window.dispatchEvent(new window.Event('scroll', {}));
          });
          expect(screen.getByTestId('trigger').textContent).to.equal('false');
        },
        { timeout: 200 },
      );
    });

    it('should behave normally when disableReentrant is true (default)', () => {
      function TestComponent() {
        const trigger = useScrollTrigger({
          threshold: 100,
          // disableReentrant defaults to true
        });

        return <span data-testid="trigger">{`${trigger}`}</span>;
      }

      render(<TestComponent />);

      expect(screen.getByTestId('trigger').textContent).to.equal('false');

      // Scroll past threshold
      act(() => {
        window.pageYOffset = 101;
        window.dispatchEvent(new window.Event('scroll', {}));
      });

      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Immediate change should work
      act(() => {
        window.pageYOffset = 99;
        window.dispatchEvent(new window.Event('scroll', {}));
      });

      expect(screen.getByTestId('trigger').textContent).to.equal('false');
    });

    it('should respect custom reentrantLockDuration', async () => {
      const customDuration = 50;

      function TestComponent() {
        const trigger = useScrollTrigger({
          threshold: 100,
          disableReentrant: false,
          reentrantLockDuration: customDuration,
        });

        return <span data-testid="trigger">{`${trigger}`}</span>;
      }

      render(<TestComponent />);

      // Trigger a change
      act(() => {
        window.pageYOffset = 101;
        window.dispatchEvent(new window.Event('scroll', {}));
      });

      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Try to change immediately - should be locked
      act(() => {
        window.pageYOffset = 99;
        window.dispatchEvent(new window.Event('scroll', {}));
      });

      expect(screen.getByTestId('trigger').textContent).to.equal('true');

      // Wait for custom duration to expire
      await waitFor(
        () => {
          act(() => {
            window.pageYOffset = 99;
            window.dispatchEvent(new window.Event('scroll', {}));
          });
          expect(screen.getByTestId('trigger').textContent).to.equal('false');
        },
        { timeout: customDuration + 50 },
      );
    });
  });

  before(function beforeHook() {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
  });

  afterEach(() => {
    window.pageYOffset = 0;
  });
});
