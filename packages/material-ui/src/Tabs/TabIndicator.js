import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';

export const styles = (theme) => ({
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create(),
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main,
  },
  vertical: {
    height: '100%',
    width: 2,
    right: 0,
  },
});

/**
 * @ignore - internal component.
 */
const TabIndicator = React.forwardRef(function TabIndicator(props, ref) {
  const { classes, className, color, orientation, ...other } = props;

  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes.vertical]: orientation === 'vertical',
        },
        classes[`color${capitalize(color)}`],
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

TabIndicator.propTypes = {
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
   * @ignore
   * The color of the tab indicator.
   */
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};

export default withStyles(styles, { name: 'PrivateTabIndicator' })(TabIndicator);
