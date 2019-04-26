import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Transition } from 'react-transition-group';

const useStyles = makeStyles({
  root: {
    width: props => props.rippleSize,
    height: props => props.rippleSize,
    top: props => -(props.rippleSize / 2) + props.rippleY,
    left: props => -(props.rippleSize / 2) + props.rippleX,
  },
}, { index: 100 });

/**
 * @ignore - internal component.
 */
function Ripple(props) {
  const { classes, className, pulsate, rippleX, rippleY, rippleSize, ...other } = props;
  const rippleClasses = useStyles({ rippleX, rippleY, rippleSize });
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
    rippleClasses.root,
  );

  const childClassName = clsx(classes.child, {
    [classes.childLeaving]: leaving,
    [classes.childPulsate]: pulsate,
  });

  return (
    <Transition onEnter={handleEnter} onExit={handleExit} {...other}>
      <span className={rippleClassName}>
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

Ripple.defaultProps = {
  pulsate: false,
};

export default Ripple;
