import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '../Typography';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    display: 'flex',
    maxHeight: '2em',
    alignItems: 'center',
  },
  positionStart: {
    marginRight: theme.spacing.unit,
  },
  positionEnd: {
    marginLeft: theme.spacing.unit,
  },
});

function InputAdornment(props) {
  const {
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position,
    ...other
  } = props;

  return (
    <Component
      className={classNames(
        classes.root,
        {
          [classes.positionStart]: position === 'start',
          [classes.positionEnd]: position === 'end',
        },
        className,
      )}
      {...other}
    >
      {typeof children === 'string' && !disableTypography ? (
        <Typography color="textSecondary">{children}</Typography>
      ) : (
        children
      )}
    </Component>
  );
}

InputAdornment.propTypes = {
  /**
   * The content of the component, normally an `IconButton` or string.
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography: PropTypes.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: PropTypes.oneOf(['start', 'end']),
};

InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false,
};

export default withStyles(styles, { name: 'MuiInputAdornment' })(InputAdornment);
