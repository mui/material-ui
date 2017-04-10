// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import transitionInfo from 'dom-helpers/transition/properties';
import addEventListener from 'dom-helpers/events/on';
import classNames from 'classnames';

const transitionEndEvent = transitionInfo.end;

export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

const propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The CSS class applied when the component is entered.
   */
  enteredClassName: PropTypes.string,
  /**
   * The CSS class applied while the component is entering.
   */
  enteringClassName: PropTypes.string,
  /**
   * The CSS class applied when the component has exited.
   */
  exitedClassName: PropTypes.string,
  /**
   * The CSS class applied while the component is exiting.
   */
  exitingClassName: PropTypes.string,
  /**
   * Show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,
  /**
   * Callback fired before the "entering" classes are applied.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied.
   */
  onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the "exiting" classes are applied.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied.
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied.
   */
  onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
  /**
   * @ignore
   */
  onRequestTimeout: PropTypes.func,
  /**
   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
   * transition indefinitely if the browser transitionEnd events are
   * canceled or interrupted.
   *
   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
   * setting this to the duration of your animation (or a bit above it).
   */
  timeout: PropTypes.number,
  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown.
   */
  transitionAppear: PropTypes.bool,
  /**
   * Unmount the component (remove it from the DOM) when it is not shown.
   */
  unmountOnExit: PropTypes.bool,
};

/**
 * Drawn from https://raw.githubusercontent.com/react-bootstrap/react-overlays/master/src/Transition.js
 *
 * The Transition component lets you define and run CSS transitions with a simple declarative api.
 * It works similarly to React's own CSSTransitionGroup
 * but is specifically optimized for transitioning a single child "in" or "out".
 *
 * You don't even need to use class based CSS transitions if you don't want to (but it is easiest).
 * The extensive set of lifecyle callbacks means you have control over
 * the transitioning now at each step of the way.
 */
class Transition extends Component {
  static propTypes = propTypes;

  static defaultProps = {
    in: false,
    unmountOnExit: false,
    transitionAppear: false,
    timeout: 5000,
    onEnter: noop,
    onEntering: noop,
    onEntered: noop,
    onExit: noop,
    onExiting: noop,
    onExited: noop,
  };

  state = {
    status: UNMOUNTED,
  };

  componentWillMount() {
    let status;

    if (this.props.in) {
      // Start enter transition in componentDidMount.
      status = this.props.transitionAppear ? EXITED : ENTERED;
    } else {
      status = this.props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    this.setState({ status });
    this.nextCallback = null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.in && this.props.unmountOnExit) {
      if (this.state.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        this.setState({ status: EXITED });
      }
    } else {
      this.needsUpdate = true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.in &&
      this.state.status === EXITED &&
      this.state.status === nextState.status
    ) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    const status = this.state.status;

    if (this.props.unmountOnExit && status === EXITED) {
      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
      // when using unmountOnExit.
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        this.setState({ status: UNMOUNTED }); // eslint-disable-line react/no-did-update-set-state
      }

      return;
    }

    // guard ensures we are only responding to prop changes
    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING) {
          this.performEnter(this.props);
        } else if (status === EXITED) {
          this.performEnter(this.props);
        }
        // Otherwise we're already entering or entered.
      } else if (status === ENTERING || status === ENTERED) {
        this.performExit(this.props);
      }
      // Otherwise we're already exited or exiting.
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
  }

  nextCallback = null;
  needsUpdate = false;

  performEnter(props) {
    this.cancelNextCallback();
    const node = ReactDOM.findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    if (props.onEnter.length === 2) {
      return props.onEnter(node, () => this.performEntering(node));
    }

    props.onEnter(node);
    return this.performEntering(node);
  }

  performEntering(node) {
    this.safeSetState({ status: ENTERING }, () => {
      this.props.onEntering(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: ENTERED }, () => {
          this.props.onEntered(node);
        });
      });
    });
  }

  performExit(props) {
    this.cancelNextCallback();
    const node = ReactDOM.findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onExit(node);

    this.safeSetState({ status: EXITING }, () => {
      this.props.onExiting(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: EXITED }, () => {
          this.props.onExited(node);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  }

  setNextCallback(callback) {
    let active = true;

    this.nextCallback = (event) => {
      if (active) {
        active = false;
        this.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }

  onTransitionEnd(node, handler) {
    this.setNextCallback(handler);

    if (node) {
      addEventListener(node, transitionEndEvent, (event) => {
        if (event.target === node && this.nextCallback) {
          this.nextCallback();
        }
      });
      setTimeout(this.nextCallback, this.getTimeout(node));
    } else {
      setTimeout(this.nextCallback, 0);
    }
  }

  getTimeout(node) {
    let timeout;

    if (this.props.onRequestTimeout) {
      timeout = this.props.onRequestTimeout(node);
    }

    if (typeof timeout !== 'number') {
      timeout = this.props.timeout;
    }

    return timeout;
  }

  render() {
    const status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    const {
      children,
      className,
      ...other
    } = this.props;
    Object.keys(propTypes).forEach((key) => delete other[key]);

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    const child = React.Children.only(children);
    return React.cloneElement(
      child,
      {
        className: classNames(child.props.className, className, transitionClassName),
        ...other,
      },
    );
  }
}

// Name the function so it is clearer in the documentation
function noop() {}

export default Transition;
