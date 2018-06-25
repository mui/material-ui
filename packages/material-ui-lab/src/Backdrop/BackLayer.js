// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import Paper from '../Paper';

export const styles = theme => {
  const backgroundColorDefault = theme.palette.primary[500];

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
      zIndex: theme.zIndex.appBar,
      flexShrink: 0,
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

function BackdropBack(props) {
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
    <Paper square elevation={0} className={className} {...other}>
      {children}
    </Paper>
  );
}

BackdropBack.propTypes = {
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
};

BackdropBack.defaultProps = {
  color: 'primary',
};

export default withStyles(styles, { name: 'MuiBackdropBack' })(BackdropBack);
