import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = theme => ({
  root: {
    userSelect: 'none',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  colorAction: {
    color: theme.palette.action.active,
  },
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  colorError: {
    color: theme.palette.error.main,
  },
});

function Icon(props) {
  const { children, classes, className: classNameProp, color, ...other } = props;

  const className = classNames(
    'material-icons',
    classes.root,
    {
      [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit',
    },
    classNameProp,
  );

  return (
    <span className={className} aria-hidden="true" {...other}>
      {children}
    </span>
  );
}

Icon.propTypes = {
  /**
   * The name of the icon font ligature.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['inherit', 'secondary', 'action', 'disabled', 'error', 'primary']),
};

Icon.defaultProps = {
  color: 'inherit',
};

Icon.muiName = 'Icon';

export default withStyles(styles, { name: 'MuiIcon' })(Icon);
