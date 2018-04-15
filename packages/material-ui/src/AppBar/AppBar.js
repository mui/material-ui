// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import Paper from '../Paper';

export const styles = theme => {
  const backgroundColorDefault =
    theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
      zIndex: theme.zIndex.appBar,
      flexShrink: 0,
    },
    positionFixed: {
      position: 'fixed',
      top: 0,
      left: 'auto',
      right: 0,
    },
    positionAbsolute: {
      position: 'absolute',
      top: 0,
      left: 'auto',
      right: 0,
    },
    positionSticky: {
      position: 'sticky',
      top: 0,
      left: 'auto',
      right: 0,
    },
    positionStatic: {
      position: 'static',
    },
    colorDefault: {
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault),
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  };
};

function AppBar(props) {
  const { children, classes, className: classNameProp, color, position, ...other } = props;

  const className = classNames(
    classes.root,
    classes[`position${capitalize(position)}`],
    {
      [classes[`color${capitalize(color)}`]]: color !== 'inherit',
      'mui-fixed': position === 'fixed', // Useful for the Dialog
    },
    classNameProp,
  );

  return (
    <Paper square component="header" elevation={4} className={className} {...other}>
      {children}
    </Paper>
  );
}

AppBar.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
  /**
   * The positioning type. The behavior of the different options is described
   * [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   */
  position: PropTypes.oneOf(['fixed', 'absolute', 'sticky', 'static']),
};

AppBar.defaultProps = {
  color: 'primary',
  position: 'fixed',
};

export default withStyles(styles, { name: 'MuiAppBar' })(AppBar);
