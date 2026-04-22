import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { screen, isJsdom } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type TransitionCallbackName =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';

interface TransitionConformanceOptions {
  /**
   * The transition component under test.
   * It must accept the common transition props used by Material UI transitions,
   * such as `in`, `timeout`, lifecycle callbacks, and `addEndListener`.
   */
  Component: React.ElementType;
  /**
   * The `render` helper returned by `createRenderer()`.
   * The generated tests use the returned `setProps` API to drive enter/exit transitions.
   */
  render: (element: React.ReactElement) => any;
  /**
   * The fake-timer controls returned by `createRenderer()`.
   * They are only used by generated tests that need transition lifecycle timers to complete.
   */
  clock: {
    withFakeTimers: () => void;
    tick: (ms: number) => void;
  };
  /**
   * Props applied to every generated render for this component.
   * Use this for required component-specific props, for example `direction` on `Slide`.
   */
  defaultProps?: Record<string, unknown>;
  /**
   * Child element rendered inside the transition component.
   * Defaults to `<div id="test" />`, which lets the helper assert callback node identity.
   */
  children?: React.ReactElement;
  /**
   * Returns the DOM node expected to be passed to lifecycle callbacks.
   * Override this when the component under test wraps its child or requires a custom test node.
   */
  getNode?: (container: HTMLElement) => HTMLElement | null;
  /**
   * Enables the shared lifecycle callback test.
   * Component-specific assertions can inspect the callback node at each lifecycle phase
   * without duplicating the callback ordering and node identity checks.
   */
  lifecycle?: {
    /**
     * Set to `true` when the component supports `addEndListener`.
     * The helper asserts that it receives the transition node and a `done` callback.
     */
    addEndListener?: boolean;
    /**
     * Optional assertion run after `onEnter` fires.
     */
    assertEnter?: (node: HTMLElement) => void;
    /**
     * Optional assertion run after `onEntering` fires.
     */
    assertEntering?: (node: HTMLElement) => void;
    /**
     * Optional assertion run after `onExit` fires.
     */
    assertExit?: (node: HTMLElement) => void;
    /**
     * Optional assertion run after `onExiting` fires.
     */
    assertExiting?: (node: HTMLElement) => void;
  };
  /**
   * Enables real-browser computed-style tests for default and custom theme durations.
   * `renderElement` must render an element with `data-testid="child"` as the animated node.
   */
  themeDuration?: {
    /**
     * Renders the transition fixture used by theme-duration tests.
     * The helper passes extra props here when checking prop-provided timeout values.
     */
    renderElement: (props?: Record<string, unknown>) => React.ReactElement;
    /**
     * Set to `true` when the component should also prove that `timeout={{ enter: 1 }}`
     * overrides the theme duration in a real browser.
     */
    testPropTimeout?: boolean;
  };
  /**
   * Enables jsdom tests for timeout-provided inline styles.
   * Use this for transition components that expose the configured enter or exit timeout
   * through a lifecycle callback node.
   */
  propTimeout?: {
    /**
     * Enter-transition timeout assertion.
     * `callback` selects the lifecycle callback where the expected enter style is observable.
     */
    enter?: {
      timeout: number;
      callback: 'onEnter' | 'onEntering';
      assertStyle: (node: HTMLElement) => void;
    };
    /**
     * Exit-transition timeout assertion.
     * `callback` selects the lifecycle callback where the expected exit style is observable.
     */
    exit?: {
      timeout: number;
      callback: 'onExit' | 'onExiting';
      assertStyle: (node: HTMLElement) => void;
    };
  };
}

export default function describeTransitionConformance(
  componentName: string,
  getOptions: () => TransitionConformanceOptions,
) {
  describe(`${componentName} transition conformance`, () => {
    const options = getOptions();
    const {
      Component,
      render,
      clock,
      defaultProps = {},
      children = <div id="test" />,
      getNode = (container) => container.querySelector('#test'),
    } = options;

    const lifecycle = options.lifecycle;

    if (lifecycle) {
      describe('lifecycle', () => {
        clock.withFakeTimers();

        it('calls transition lifecycle callbacks with the child node', () => {
          const addEndListener = spy();
          const handlers: Record<TransitionCallbackName, sinon.SinonSpy> = {
            onEnter: spy(),
            onEntering: spy(),
            onEntered: spy(),
            onExit: spy(),
            onExiting: spy(),
            onExited: spy(),
          };

          const props = {
            ...defaultProps,
            in: false,
            ...(lifecycle.addEndListener ? { addEndListener } : {}),
            ...handlers,
          };

          const { container, setProps } = render(<Component {...props}>{children}</Component>);
          const node = getNode(container);
          expect(node).not.to.equal(null);

          setProps({ ...props, in: true });

          if (lifecycle.addEndListener) {
            expect(addEndListener.callCount).to.equal(1);
            expect(addEndListener.args[0][0]).to.equal(node);
            expect(typeof addEndListener.args[0][1]).to.equal('function');
          }

          expect(handlers.onEnter.callCount).to.equal(1);
          expect(handlers.onEnter.args[0][0]).to.equal(node);
          lifecycle.assertEnter?.(handlers.onEnter.args[0][0]);

          expect(handlers.onEntering.callCount).to.equal(1);
          expect(handlers.onEntering.args[0][0]).to.equal(node);
          lifecycle.assertEntering?.(handlers.onEntering.args[0][0]);

          clock.tick(1000);
          expect(handlers.onEntered.callCount).to.equal(1);
          expect(handlers.onEntered.args[0][0]).to.equal(node);

          setProps({ ...props, in: false });

          expect(handlers.onExit.callCount).to.equal(1);
          expect(handlers.onExit.args[0][0]).to.equal(node);
          lifecycle.assertExit?.(handlers.onExit.args[0][0]);

          expect(handlers.onExiting.callCount).to.equal(1);
          expect(handlers.onExiting.args[0][0]).to.equal(node);
          lifecycle.assertExiting?.(handlers.onExiting.args[0][0]);

          clock.tick(1000);
          expect(handlers.onExited.callCount).to.equal(1);
          expect(handlers.onExited.args[0][0]).to.equal(node);
        });
      });
    }

    const themeDuration = options.themeDuration;

    if (themeDuration) {
      describe('theme duration', () => {
        it.skipIf(isJsdom())('uses the default theme duration by default', function test() {
          const theme = createTheme();
          const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;

          render(themeDuration.renderElement());

          expect(screen.getByTestId('child')).toHaveComputedStyle({
            transitionDuration: `${enteringScreenDurationInSeconds}s`,
          });
        });

        it.skipIf(isJsdom())('uses custom theme duration', function test() {
          const theme = createTheme({
            transitions: {
              duration: {
                enteringScreen: 1,
              },
            },
          });

          render(<ThemeProvider theme={theme}>{themeDuration.renderElement()}</ThemeProvider>);

          expect(screen.getByTestId('child')).toHaveComputedStyle({
            transitionDuration: '0.001s',
          });
        });

        if (themeDuration.testPropTimeout) {
          it.skipIf(isJsdom())('uses values provided via prop', function test() {
            render(themeDuration.renderElement({ timeout: { enter: 1 } }));

            expect(screen.getByTestId('child')).toHaveComputedStyle({
              transitionDuration: '0.001s',
            });
          });
        }
      });
    }

    const propTimeout = options.propTimeout;

    if (propTimeout) {
      describe('prop: timeout', () => {
        const enterTimeout = propTimeout.enter;
        const exitTimeout = propTimeout.exit;

        if (enterTimeout) {
          it('creates the configured enter animation', () => {
            const handler = spy();
            const props = {
              ...defaultProps,
              in: false,
              timeout: { enter: enterTimeout.timeout },
              [enterTimeout.callback]: handler,
            };
            const { setProps } = render(<Component {...props}>{children}</Component>);

            setProps({ ...props, in: true });
            expect(handler.callCount).to.equal(1);
            enterTimeout.assertStyle(handler.args[0][0]);
          });
        }

        if (exitTimeout) {
          it('creates the configured exit animation', () => {
            const handler = spy();
            const props = {
              ...defaultProps,
              in: true,
              appear: false,
              timeout: { exit: exitTimeout.timeout },
              [exitTimeout.callback]: handler,
            };
            const { setProps } = render(<Component {...props}>{children}</Component>);

            setProps({ ...props, in: false });
            expect(handler.callCount).to.equal(1);
            exitTimeout.assertStyle(handler.args[0][0]);
          });
        }
      });
    }
  });
}
