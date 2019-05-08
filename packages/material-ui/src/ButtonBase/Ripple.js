import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';

/**
 * @ignore - internal component.
 */
function Ripple(props) {
  const { classes, className, pulsate = false, rippleX, rippleY, rippleSize, ...other } = props;
  const [visible, setVisible] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);

  const handleEnter = () => {
    setVisible(true);
  };

  const handleExit = () => {
    setLeaving(true);
  };

  const rippleClassName = clsx(
    classes.ripple,
    {
      [classes.rippleVisible]: visible,
      [classes.ripplePulsate]: pulsate,
    },
    className,
  );

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = clsx(classes.child, {
    [classes.childLeaving]: leaving,
    [classes.childPulsate]: pulsate,
  });

  return (
    <Transition onEnter={handleEnter} onExit={handleExit} {...other}>
      <span className={rippleClassName} style={rippleStyles}>
        <span className={childClassName} />
      </span>
    </Transition>
  );
}

Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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

export default Ripple;
