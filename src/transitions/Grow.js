// @inheritedComponent CSSTransition

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import withTheme from '../styles/withTheme';

// Only exported for tests.
export function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

/**
 * The Grow transition is used by the Popover component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Grow extends React.Component {
  autoTimeout = undefined;

  handleEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    let duration = 0;

    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      this.autoTimeout = duration;
    } else if (typeof timeout === 'number') {
      duration = timeout;
    } else if (timeout && typeof timeout.enter === 'number') {
      duration = timeout.enter;
    } else {
      // The propType will warn in this case.
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
      }),
    ].join(',');

    node.style.opacity = '1';
    node.style.transform = getScale(1);

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    let duration = 0;

    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      this.autoTimeout = duration;
    } else if (typeof timeout === 'number') {
      duration = timeout;
    } else if (timeout && typeof timeout.exit === 'number') {
      duration = timeout.exit;
    } else {
      // The propType will warn in this case.
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: duration * 0.333,
      }),
    ].join(',');

    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  addEndListener = (node, next: Function) => {
    if (this.props.timeout === 'auto') {
      setTimeout(next, this.autoTimeout || 0);
    }
  };

  render() {
    const {
      appear,
      children,
      onEnter,
      onEntering,
      onExit,
      style: styleProp,
      theme,
      timeout,
      transitionClasses = {},
      ...other
    } = this.props;

    let style = {};

    // For server side rendering.
    if (!this.props.in || appear) {
      style.opacity = '0';
    }

    style = {
      ...style,
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <CSSTransition
        classNames={transitionClasses}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        addEndListener={this.addEndListener}
        appear={appear}
        style={style}
        timeout={timeout === 'auto' ? null : timeout}
        {...other}
      >
        {children}
      </CSSTransition>
    );
  }
}

Grow.propTypes = {
  /**
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
  /**
   * The animation classNames applied to the component as it enters or exits.
   * This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames).
   */
  transitionClasses: PropTypes.shape({
    appear: PropTypes.string,
    appearActive: PropTypes.string,
    enter: PropTypes.string,
    enterActive: PropTypes.string,
    exit: PropTypes.string,
    exitActive: PropTypes.string,
  }),
};

Grow.defaultProps = {
  appear: true,
  timeout: 'auto',
};

export default withTheme()(Grow);
