import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create(),
    willChange: 'left, width',
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main,
  },
});

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  const { classes, className, color, TabIndicatorStyle, style, ...other } = props;

  const styleProps =
    Object.keys(TabIndicatorStyle).length !== 0
      ? {
          ...TabIndicatorStyle,
          ...style,
        }
      : style;

  return (
    <span
      className={classNames(classes.root, classes[`color${capitalize(color)}`], className)}
      style={styleProps}
      {...other}
    />
  );
}

TabIndicator.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
  color: PropTypes.oneOf([PropTypes.string, PropTypes.oneOf(['secondary', 'primary'])]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * Useful to extend or add custom style to component
   */
  TabIndicatorStyle: PropTypes.object,
};

export default withStyles(styles)(TabIndicator);
