// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import { capitalize } from '@material-ui/core/utils/helpers';
import Paper from '@material-ui/core/Paper';

export const styles = theme => {
  return {
    root: {
      position: 'absolute',
      zIndex: 0,
      display: 'flex',
      flexFlow: 'column',
      width: '100%',
      height: '100%',
    },
    backLayer: {},
    frontLayer: {},
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
  const { children, classes, className: classNameProp, color, ...other } = props;

  const className = classNames(
    classes.root,
    {
      [classes[`color${capitalize(color)}`]]: color !== 'inherit',
    },
    classNameProp,
  );

  return (
    <Paper square elevation={0} className={className} {...other}>
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
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
};

Backdrop.defaultProps = {
  color: 'primary',
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
