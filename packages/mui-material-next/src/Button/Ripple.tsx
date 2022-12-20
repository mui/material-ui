import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export interface RippleProps {
  className?: string;
  classes: Record<string, string>;
  rippleX: number;
  rippleY: number;
  rippleSize: number;
  in?: boolean;
  onExited?: () => void;
  timeout: number;
}
/**
 * @ignore - internal component.
 */
function Ripple(props: RippleProps) {
  const { className, classes, rippleX, rippleY, rippleSize, in: inProp, onExited, timeout } = props;
  const [leaving, setLeaving] = React.useState(false);

  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible);

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = clsx(classes.child, {
    [classes.childLeaving]: leaving,
  });

  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);

  return (
    <span className={rippleClassName} style={rippleStyles}>
      <span className={childClassName} />
    </span>
  );
}

Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: PropTypes.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: PropTypes.func,
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
  /**
   * exit delay
   */
  timeout: PropTypes.number.isRequired,
};

export default Ripple;
