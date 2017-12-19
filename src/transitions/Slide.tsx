// @inheritedComponent Transition

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Transition from 'react-transition-group/Transition';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import withTheme, { WithTheme } from '../styles/withTheme';
import { duration } from '../styles/transitions';
import { TransitionProps } from './transition';

const GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props: SlideProps, node: HTMLElement) {
  const { direction } = props;
  const rect = node.getBoundingClientRect();

  let transform;

  if ((node as any).fakeTransform) {
    transform = (node as any).fakeTransform;
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

export function setTranslateValue(props: SlideProps, node: HTMLElement) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.transform = transform;
    node.style.webkitTransform = transform;
  }
}

const reflow = (node: Element) => node.scrollTop;

export interface SlideProps extends TransitionProps {
  direction: 'left' | 'right' | 'up' | 'down';
}

interface State {
  firstMount: boolean;
}

class Slide extends React.Component<SlideProps & WithTheme, State> {
  static defaultProps = {
    timeout: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
  };
  state = {
    // We use this state to handle the server-side rendering.
    firstMount: true,
  };

  componentDidMount() {
    // state.firstMount handle SSR, once the component is mounted, we need
    // to properly hide it.
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      this.updatePosition();
    }
  }

  componentWillReceiveProps() {
    this.setState({
      firstMount: false,
    });
  }

  componentDidUpdate(prevProps: SlideProps) {
    if (prevProps.direction !== this.props.direction && !this.props.in) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  transition: any = null;

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

  handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    setTranslateValue(this.props, node);
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node, isAppearing);
    }
  };

  handleEntering = (node: HTMLElement) => {
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
      this.props.onEntering(node, true);
    }
  };

  handleExit = (node: HTMLElement) => {
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

  handleExited = (node: HTMLElement) => {
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

    const style = { ...styleProp };

    if (!this.props.in && this.state.firstMount) {
      style.visibility = 'hidden';
    }

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Transition
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onExit={this.handleExit}
          onExited={this.handleExited}
          appear
          style={style}
          {...other}
          ref={(node: any) => {
            this.transition = node;
          }}
        >
          {children}
        </Transition>
      </EventListener>
    );
  }
}

(Slide as any).propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.element,
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

export default withTheme()(Slide);
