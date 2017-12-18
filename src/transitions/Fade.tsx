// @inheritedComponent Transition

import * as React from 'react';
import * as PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme, { WithTheme } from '../styles/withTheme';
import { TransitionProps } from './transition';

export interface FadeProps extends TransitionProps {}

const reflow = (node: Element) => node.scrollTop;

/**
 * The Fade transition is used by the Modal component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Fade extends React.Component<FadeProps & WithTheme> {
  static defaultProps: Partial<FadeProps> = {
    appear: true,
    timeout: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
  };

  handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    node.style.opacity = '0';
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node, isAppearing);
    }
  };

  handleEntering = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
    });
    node.style.webkitTransition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
    });
    node.style.opacity = '1';

    if (this.props.onEntering) {
      this.props.onEntering(node, true);
    }
  };

  handleExit = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
    });
    node.style.webkitTransition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
    });
    node.style.opacity = '0';

    if (this.props.onExit) {
      this.props.onExit(node);
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
      ...other,
    } = this.props;

    const style = { ...styleProp };

    // For server side rendering.
    if (!this.props.in || appear) {
      style.opacity = 0;
    }

    return (
      <Transition
        appear={appear}
        style={style}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}

(Fade as any).propTypes = {
  /**
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: PropTypes.element,
  /**
   * If `true`, the component will transition in.
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

export default withTheme()(Fade);
