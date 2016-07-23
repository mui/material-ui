import React, { Component, PropTypes } from 'react';
import Transition from '../internal/Transition';

export default class Slide extends Component {
  static propTypes = {
    centered: PropTypes.bool,
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    /**
     * Callback fired before the component is entering
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the component is entering
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the component has entered
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the component is exiting
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the component is exiting
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the component has exited
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    direction: 'right',
    transitionDuration: 300,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.transform = this.getTranslateValue(this.props);
    element.style.transition = this.context.theme.transitions.create('transform', `${this.props.transitionDuration}ms`);
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = (element) => {
    element.style.transform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExiting = (element) => {
    element.style.transform = this.getTranslateValue(this.props);
    if (this.props.onExiting) {
      this.props.onExiting(element);
    }
  };

  getTranslateValue(props) {
    const { centered, direction } = props;

    if (centered) {
      if (direction === 'left') {
        return 'translate3d(calc(50vw + 50%), 0, 0)';
      } else if (direction === 'right') {
        return 'translate3d(calc(-50vw - 50%), 0, 0)';
      } else if (direction === 'up') {
        return 'translate3d(0, calc(50vw + 50%), 0)';
      } else if (direction === 'down') {
        return 'translate3d(0, calc(-50vw - 50%), 0)';
      }
    }

    if (direction === 'left') {
      return 'translate3d(100%, 0, 0)';
    } else if (direction === 'right') {
      return 'translate3d(-100%, 0, 0)';
    } else if (direction === 'up') {
      return 'translate3d(0, 100%, 0)';
    } else if (direction === 'down') {
      return 'translate3d(0, -100%, 0)';
    }

    return 'translate3d(0, 0, 0)';
  }

  render() {
    const {
      centered, // eslint-disable-line no-unused-vars
      children,
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onExiting, // eslint-disable-line no-unused-vars
      transitionDuration, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExiting={this.handleExiting}
        timeout={500}
        transitionAppear
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
