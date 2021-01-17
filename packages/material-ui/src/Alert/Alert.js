import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import { darken, lighten } from '../styles/colorManipulator';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import alertClasses, { getAlertUtilityClass } from './alertClasses';
import IconButton from '../IconButton';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[styleProps.variant],
    ...styles[`${styleProps.variant}${capitalize(styleProps.color || styleProps.severity)}`],
    [`& .${alertClasses.icon}`]: styles.icon,
    [`& .${alertClasses.message}`]: styles.message,
    [`& .${alertClasses.action}`]: styles.action,
  });
};

const useUtilityClasses = (styleProps) => {
  const { variant, color, severity, classes } = styleProps;

  const slots = {
    root: ['root', `${variant}${capitalize(color || severity)}`, `${variant}`],
    icon: ['icon'],
    message: ['message'],
    action: ['action'],
  };

  return composeClasses(slots, getAlertUtilityClass, classes);
};

const AlertRoot = experimentalStyled(
  Paper,
  {},
  {
    name: 'MuiAlert',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  const getColor = theme.palette.mode === 'light' ? darken : lighten;
  const getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;

  return {
    /* Styles applied to the root element. */
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px',
    /* Styles applied to the root element if variant="standard". */
    ...(styleProps.variant === 'standard' && styleProps.color && {
        color: getColor(theme.palette[styleProps.color].main, 0.6),
        backgroundColor: getBackgroundColor(theme.palette[styleProps.color].main, 0.9),
        [`& .${alertClasses.icon}`]: {
          color: theme.palette[styleProps.color].main,
        },
      }),
    /* Styles applied to the root element if variant="outlined". */
    ...(styleProps.variant === 'outlined' && styleProps.color && {
        color: getColor(theme.palette[styleProps.color].main, 0.6),
        border: `1px solid ${theme.palette[styleProps.color].main}`,
        [`& .${alertClasses.icon}`]: {
          color: theme.palette[styleProps.color].main,
        },
      }),
    /* Styles applied to the root element if variant="filled". */
    ...(styleProps.variant === 'filled' && styleProps.color && {
        color: '#fff',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: theme.palette[styleProps.color].main,
      }),
  };
});

/* Styles applied to the icon wrapper element. */
const AlertIcon = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiAlert',
    slot: 'Icon',
  },
)({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9,
});

/* Styles applied to the message wrapper element. */
const AlertMessage = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiAlert',
    slot: 'Message',
  },
)({
  padding: '8px 0',
});

/* Styles applied to the action wrapper element if `action` is provided. */
const AlertAction = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiAlert',
    slot: 'Message',
  },
)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8,
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
    className,
    closeText = 'Close',
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    severity = 'success',
    variant = 'standard',
    ...other
  } = props;

  const styleProps = {
    ...other,
    variant,
    color,
    severity,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <AlertRoot
      role={role}
      square
      elevation={0}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {icon !== false ? (
        <AlertIcon className={classes.icon}>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </AlertIcon>
      ) : null}
      <AlertMessage className={classes.message}>{children}</AlertMessage>
      {action != null ? <AlertAction className={classes.action}>{action}</AlertAction> : null}
      {action == null && onClose ? (
        <AlertAction className={classes.action}>
          <IconButton
            size="small"
            aria-label={closeText}
            title={closeText}
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </AlertAction>
      ) : null}
    </AlertRoot>
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
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: PropTypes.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node,
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined', 'standard']),
    PropTypes.string,
  ]),
};

export default Alert;
