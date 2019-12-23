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
    padding: '16px 0',
    maxWidth: 800,
  },
  alertContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: '0 16px',
  },
  startIcon: {
    marginTop: '4px',
    marginRight: '-16px',
    padding: '0 16px',
    alignSelf: 'flex-start',
  },
  closeIcon: {
    marginTop: '-8px',
    alignSelf: 'flex-start',
  },
  success: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    backgroundColor: lighten(theme.palette.success.main, 0.95),
  },
  info: {
    color: theme.palette.info.main,
    borderColor: theme.palette.info.main,
    backgroundColor: lighten(theme.palette.info.main, 0.95),
  },
  warning: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
    backgroundColor: lighten(theme.palette.warning.main, 0.95),
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    backgroundColor: lighten(theme.palette.error.main, 0.95),
  },
});

const DEFAULT_ICONS = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <Error />,
  info: <Info />,
};

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
      {startIconProp || DEFAULT_ICONS[type]}
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
