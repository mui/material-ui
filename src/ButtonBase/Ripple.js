// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

/**
 * @ignore - internal component.
 */
class Ripple extends Component {
  static defaultProps = {
    pulsate: false,
  };

  state = {
    rippleVisible: false,
  };

  handleEnter = () => {
    this.setState({
      rippleVisible: true,
    });
  };

  handleExit = () => {
    this.setState({
      rippleLeaving: true,
    });
  };

  getRippleStyles = props => {
    const { rippleSize, rippleX, rippleY } = props;

    return {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };
  };

  render() {
    const {
      classes,
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      ...other
    } = this.props;
    const { rippleVisible, rippleLeaving } = this.state;

    const className = classNames(
      classes.wrapper,
      {
        [classes.wrapperLeaving]: rippleLeaving,
        [classes.wrapperPulsating]: pulsate,
      },
      classNameProp,
    );

    const rippleClassName = classNames(classes.ripple, {
      [classes.rippleVisible]: rippleVisible,
      [classes.rippleFast]: pulsate,
    });

    return (
      <Transition onEnter={this.handleEnter} onExit={this.handleExit} {...other}>
        <span className={className}>
          <span className={rippleClassName} style={this.getRippleStyles(this.props)} />
        </span>
      </Transition>
    );
  }
}

Ripple.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number.isRequired,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number.isRequired,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number.isRequired,
};

export default Ripple;
