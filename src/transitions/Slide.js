// @inheritedComponent Transition

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import Transition from 'react-transition-group/Transition';
import ownerWindow from 'dom-helpers/ownerWindow';
import polyfill from 'react-lifecycles-compat';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';
import { reflow, getTransitionProps } from './utils';

const GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, node) {
  const { direction } = props;
  const rect = node.getBoundingClientRect();

  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = ownerWindow(node).getComputedStyle(node);
    transform =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform
      .split('(')[1]
      .split(')')[0]
      .split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
  } else if (direction === 'right') {
    return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
  } else if (direction === 'up') {
    return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
  }

  // direction === 'down'
  return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
}

export function setTranslateValue(props, node) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}

/**
 * The Slide transition is used by the [Snackbar](/demos/snackbars) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Slide extends React.Component {
  componentDidMount() {
    // state.mounted handle SSR, once the component is mounted, we need
    // to properly hide it.
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      this.updatePosition();
    }

    this.mounted = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.direction !== this.props.direction && !this.props.in) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  mounted = false;
  transition = null;

  updatePosition() {
    const node = ReactDOM.findDOMNode(this.transition);
    if (node) {
      node.style.visibility = 'inherit';
      setTranslateValue(this.props, node);
    }
  }

  handleResize = debounce(() => {
    // Skip configuration where the position is screen size invariant.
    if (this.props.in || this.props.direction === 'down' || this.props.direction === 'right') {
      return;
    }

    const node = ReactDOM.findDOMNode(this.transition);
    if (node) {
      setTranslateValue(this.props, node);
    }
  }, 166); // Corresponds to 10 frames at 60 Hz.

  handleEnter = node => {
    setTranslateValue(this.props, node);
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = node => {
    const { theme } = this.props;

    const transitionProps = getTransitionProps(this.props, {
      mode: 'enter',
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.webkitTransform = 'translate(0, 0)';
    node.style.transform = 'translate(0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = node => {
    const { theme } = this.props;

    const transitionProps = getTransitionProps(this.props, {
      mode: 'exit',
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
      easing: theme.transitions.easing.sharp,
    });
    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
      easing: theme.transitions.easing.sharp,
    });
    setTranslateValue(this.props, node);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExited = node => {
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (this.props.onExited) {
      this.props.onExited(node);
    }
  };

  render() {
    const {
      children,
      onEnter,
      onEntering,
      onExit,
      onExited,
      style: styleProp,
      theme,
      ...other
    } = this.props;

    let style = {};

    // We use this state to handle the server-side rendering.
    // We don't know the width of the children ahead of time.
    // We need to render it.
    if (!this.props.in && !this.mounted) {
      style.visibility = 'hidden';
    }

    style = {
      ...style,
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Transition
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onExit={this.handleExit}
          onExited={this.handleExited}
          appear
          style={style}
          ref={node => {
            this.transition = node;
          }}
          {...other}
        >
          {children}
        </Transition>
      </EventListener>
    );
  }
}

Slide.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Direction the child node will enter from.
   */
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
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
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

Slide.defaultProps = {
  direction: 'down',
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(polyfill(Slide));
