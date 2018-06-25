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
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 0,
    },
    backLayer: {

    },
    frontLayer: {

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

function Backdrop(props) {
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
    <Paper square elevation={0} className={classes.root} {...other}>
      {children}
    </Paper>
  );
}

Backdrop.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
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

Backdrop.defaultProps = {
  color: 'primary',
  position: 'fixed',
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
