import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, lighten, darken } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { capitalize } from '@material-ui/core/utils';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px',
  },
  /* Styles applied to the root element if `variant="text"` and `color="success"`. */
  textSuccess: {
    color: darken(theme.palette.success.main, 0.6),
    backgroundColor: lighten(theme.palette.success.main, 0.9),
    '& $icon': {
      color: theme.palette.success.main,
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="info"`. */
  textInfo: {
    color: darken(theme.palette.info.main, 0.6),
    backgroundColor: lighten(theme.palette.info.main, 0.9),
    '& $icon': {
      color: theme.palette.info.main,
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="warning"`. */
  textWarning: {
    color: darken(theme.palette.warning.main, 0.6),
    backgroundColor: lighten(theme.palette.warning.main, 0.9),
    '& $icon': {
      color: theme.palette.warning.main,
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="error"`. */
  textError: {
    color: darken(theme.palette.error.main, 0.6),
    backgroundColor: lighten(theme.palette.error.main, 0.9),
    '& $icon': {
      color: theme.palette.error.main,
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="success"`. */
  outlinedSuccess: {
    color:
      theme.palette.type === 'light'
        ? darken(theme.palette.success.main, 0.6)
        : lighten(theme.palette.success.main, 0.6),
    border: `1px solid ${theme.palette.success.main}`,
    '& $icon': {
      color: theme.palette.success.main,
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="info"`. */
  outlinedInfo: {
    color:
      theme.palette.type === 'light'
        ? darken(theme.palette.info.main, 0.6)
        : lighten(theme.palette.info.main, 0.6),
    border: `1px solid ${theme.palette.info.main}`,
    '& $icon': {
      color: theme.palette.info.main,
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
  outlinedWarning: {
    color:
      theme.palette.type === 'light'
        ? darken(theme.palette.warning.main, 0.6)
        : lighten(theme.palette.warning.main, 0.6),
    border: `1px solid ${theme.palette.warning.main}`,
    '& $icon': {
      color: theme.palette.warning.main,
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="error"`. */
  outlinedError: {
    color:
      theme.palette.type === 'light'
        ? darken(theme.palette.error.main, 0.6)
        : lighten(theme.palette.error.main, 0.6),
    border: `1px solid ${theme.palette.error.main}`,
    '& $icon': {
      color: theme.palette.error.main,
    },
  },
  /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
  filledSuccess: {
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.success.main,
  },
  /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
  filledInfo: {
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.info.main,
  },
  /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
  filledWarning: {
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.warning.main,
  },
  /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
  filledError: {
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.error.main,
  },
  /* Styles applied to the icon wrapper element. */
  icon: {
    marginRight: 12,
    padding: '7px 0',
    display: 'flex',
    fontSize: 22,
    opacity: 0.9,
  },
  /* Styles applied to the message wrapper element. */
  message: {
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  /* Styles applied to the action wrapper element if `action` is provided. */
  action: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingLeft: 16,
    marginRight: -8,
  },
});

const defaultIconMapping = {
  success: <SuccessOutlinedIcon fontSize="inherit" />,
  warning: <ReportProblemOutlinedIcon fontSize="inherit" />,
  error: <ErrorOutlineIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  const {
    action,
    children,
    classes,
    className,
    closeText = 'Close',
    color = 'success',
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    variant = 'text',
    ...other
  } = props;

  return (
    <Paper
      role={role}
      square
      elevation={0}
      className={clsx(classes.root, classes[`${variant}${capitalize(color)}`], className)}
      ref={ref}
      {...other}
    >
      {icon !== false ? (
        <div className={classes.icon}>
          {icon || iconMapping[color] || defaultIconMapping[color]}
        </div>
      ) : null}
      <div className={classes.message}>{children}</div>
      {action != null ? <div className={classes.action}>{action}</div> : null}
      {action == null && onClose ? (
        <div className={classes.action}>
          <IconButton
            size="small"
            aria-label={closeText}
            title={closeText}
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : null}
    </Paper>
  );
});

Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
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
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: PropTypes.string,
  /**
   * Main color for the Alert, picked from theme palette.
   */
  color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * The icon element placed before the children.
   */
  icon: PropTypes.node,
  /**
   * The component maps the color prop to a range of different icons.
   * For instance, success to `<SuccessOutlined>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node,
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no action prop is set, a close icon is displayed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The role attribute of the element.
   */
  role: PropTypes.string,
  /**
   * The variant of the Alert.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
};

export default withStyles(styles, { name: 'MuiAlert' })(Alert);
