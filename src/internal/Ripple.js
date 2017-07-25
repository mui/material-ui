// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  componentWillUnmount() {
    clearTimeout(this.leaveTimer);
  }

  componentWillEnter(callback) {
    this.start(callback);
  }

  componentWillLeave(callback) {
    this.stop(() => {
      this.leaveTimer = setTimeout(() => {
        callback();
      }, 550);
    });
  }

  ripple = null;
  leaveTimer = null;

  start = callback => {
    this.setState(
      {
        rippleVisible: true,
      },
      callback,
    );
  };

  stop = callback => {
    this.setState(
      {
        rippleLeaving: true,
      },
      callback,
    );
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
    const { classes, className: classNameProp, pulsate } = this.props;
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
      <span className={className}>
        <span className={rippleClassName} style={this.getRippleStyles(this.props)} />
      </span>
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
