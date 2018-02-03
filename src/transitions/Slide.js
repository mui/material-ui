// @inheritedComponent Transition

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import Transition from 'react-transition-group/Transition';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';

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
    const computedStyle = window.getComputedStyle(node);
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

  // direction === 'down
  return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
}

export function setTranslateValue(props, node) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.transform = transform;
    node.style.webkitTransform = transform;
  }
}

const reflow = node => node.scrollTop;

class Slide extends React.Component {
  state = {
    mounted: false,
  };

  componentDidMount() {
    // state.mounted handle SSR, once the component is mounted, we need
    // to properly hide it.
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      this.updatePosition();
    }
  }

  componentWillReceiveProps() {
    this.setState({
      mounted: true,
    });
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

  transition = null;

  updatePosition() {
    const element = findDOMNode(this.transition);
    if (element instanceof HTMLElement) {
      element.style.visibility = 'inherit';
      setTranslateValue(this.props, element);
    }
  }

  handleResize = debounce(() => {
    // Skip configuration where the position is screen size invariant.
    if (this.props.in || this.props.direction === 'down' || this.props.direction === 'right') {
      return;
    }

    const node = findDOMNode(this.transition);
    if (node instanceof HTMLElement) {
      setTranslateValue(this.props, node);
    }
  }, 166);

  handleEnter = node => {
    setTranslateValue(this.props, node);
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = node => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.transform = 'translate3d(0, 0, 0)';
    node.style.webkitTransform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = node => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      easing: theme.transitions.easing.sharp,
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      easing: theme.transitions.easing.sharp,
    });
    setTranslateValue(this.props, node);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExited = node => {
    // No need for transitions when the component is hidden
    node.style.transition = '';
    node.style.webkitTransition = '';

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
    if (!this.props.in && !this.state.mounted) {
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
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

Slide.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(Slide);
