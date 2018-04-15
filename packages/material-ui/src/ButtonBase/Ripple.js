import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

/**
 * @ignore - internal component.
 */
class Ripple extends React.Component {
  state = {
    visible: false,
    leaving: false,
  };

  handleEnter = () => {
    this.setState({
      visible: true,
    });
  };

  handleExit = () => {
    this.setState({
      leaving: true,
    });
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
    const { visible, leaving } = this.state;

    const rippleClassName = classNames(
      classes.ripple,
      {
        [classes.rippleVisible]: visible,
        [classes.ripplePulsate]: pulsate,
      },
      classNameProp,
    );

    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };

    const childClassName = classNames(classes.child, {
      [classes.childLeaving]: leaving,
      [classes.childPulsate]: pulsate,
    });

    return (
      <Transition onEnter={this.handleEnter} onExit={this.handleExit} {...other}>
        <span className={rippleClassName} style={rippleStyles}>
          <span className={childClassName} />
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
  rippleSize: PropTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,
};

Ripple.defaultProps = {
  pulsate: false,
};

export default Ripple;
