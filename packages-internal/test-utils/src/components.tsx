import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * A basic error boundary that can be used to assert thrown errors in render.
 * @example <ErrorBoundary ref={errorRef}><MyComponent /></ErrorBoundary>;
 *          expect(errorRef.current.errors).to.have.length(0);
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,
  };

  /**
   * @public
   */
  errors: unknown[] = [];

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch(error: unknown) {
    this.errors.push(error);
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * Allows counting how many times the owner of `RenderCounter` rendered or
 * a component within the RenderCounter tree "commits" an update.
 * @example <RenderCounter ref={getRenderCountRef}>...</RenderCounter>
 *          getRenderCountRef.current() === 2
 */
export const RenderCounter = React.forwardRef<() => number, { children: React.ReactNode }>(
  function RenderCounter({ children }, ref) {
    const getRenderCountRef = React.useRef(0);
    React.useImperativeHandle(ref, () => () => getRenderCountRef.current);

    return (
      <React.Profiler
        id="render-counter"
        onRender={() => {
          getRenderCountRef.current += 1;
        }}
      >
        {children}
      </React.Profiler>
    );
  },
);
