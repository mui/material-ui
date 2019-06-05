import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import Paper from '../Paper';

export const styles = theme => {
  const backgroundColorDefault =
    theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
      zIndex: theme.zIndex.appBar,
      flexShrink: 0,
    },
    /* Styles applied to the root element if `position="fixed"`. */
    positionFixed: {
      position: 'fixed',
      top: 0,
      left: 'auto',
      right: 0,
    },
    /* Styles applied to the root element if `position="absolute"`. */
    positionAbsolute: {
      position: 'absolute',
      top: 0,
      left: 'auto',
      right: 0,
    },
    /* Styles applied to the root element if `position="sticky"`. */
    positionSticky: {
      position: 'sticky',
      top: 0,
      left: 'auto',
      right: 0,
    },
    /* Styles applied to the root element if `position="static"`. */
    positionStatic: {
      position: 'static',
    },
    /* Styles applied to the root element if `position="relative"`. */
    positionRelative: {
      position: 'relative',
    },
    /* Styles applied to the root element if `color="default"`. */
    colorDefault: {
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault),
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  };
};

const AppBar = React.forwardRef(function AppBar(props, ref) {
  const { classes, className, color = 'primary', position = 'fixed', ...other } = props;

  return (
    <Paper
      square
      component="header"
      elevation={4}
      className={clsx(
        classes.root,
        classes[`position${capitalize(position)}`],
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          'mui-fixed': position === 'fixed', // Useful for the Dialog
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

AppBar.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   */
  position: PropTypes.oneOf(['fixed', 'absolute', 'sticky', 'static', 'relative']),
};

export default withStyles(styles, { name: 'MuiAppBar' })(AppBar);
