import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, lighten } from '@material-ui/core/styles';
import Close from '../internal/svg-icons/Close';
import { IconButton } from '@material-ui/core';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import Error from '../internal/svg-icons/Error';
import Info from '../internal/svg-icons/Info';
import { green, orange, red } from '@material-ui/core/colors';

export const styles = theme => ({
  root: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '1em 0',
    maxWidth: 800,
  },
  alertContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: '0 1em',
  },
  startIcon: {
    marginTop: '0.25em',
    marginRight: '-1em',
    padding: '0 1em',
    alignSelf: 'flex-start',
  },
  closeIcon: {
    marginTop: '-0.5em',
    alignSelf: 'flex-start',
  },
  success: {
    // THESE COLORS ARE STUBBED WHILE https://github.com/mui-org/material-ui/issues/13875 gets done
    color: green[600],
    borderColor: green[600],
    backgroundColor: lighten(green[600], 0.95),
  },
  info: {
    // THESE COLORS ARE STUBBED WHILE https://github.com/mui-org/material-ui/issues/13875 gets done
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.main, 0.95),
  },
  warning: {
    // THESE COLORS ARE STUBBED WHILE https://github.com/mui-org/material-ui/issues/13875 gets done
    color: orange[600],
    borderColor: orange[600],
    backgroundColor: lighten(orange[600], 0.95),
  },
  error: {
    // THESE COLORS ARE STUBBED WHILE https://github.com/mui-org/material-ui/issues/13875 gets done
    color: red[600],
    borderColor: red[600],
    backgroundColor: lighten(red[600], 0.95),
  },
});

const getDefaultIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircle />;

    case 'warning':
      return <Warning />;

    case 'error':
      return <Error />;

    default:
    case 'info':
      return <Info />;
  }
}

const Alert = React.forwardRef(function Alert(props, ref) {
  const {
    children,
    className,
    classes,
    closeIcon: closeIconProp = <Close />,
    onClose,
    startIcon: startIconProp,
    type = 'info',
  } = props;

  const startIcon = startIconProp !== false && (
    <span className={clsx(classes.startIcon, classes[type], className)}>
      {startIconProp || getDefaultIcon(type)}
    </span>
  );

  const closeIcon = onClose && (
    <IconButton className={clsx(classes.closeIcon, classes[type], className)} onClick={onClose}>
      {closeIconProp}
    </IconButton>
  );

  return (
    <div className={clsx(classes.root, classes[type], className)} ref={ref}>
      {startIcon}
      <div className={clsx(classes.alertContent, className)}>{children}</div>
      {closeIcon}
    </div>
  );
});

Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Element placed before the children.
   */
  closeIcon: PropTypes.node,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The type of Alert
   */
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
};

export default withStyles(styles, { name: 'MuiAlert' })(Alert);
