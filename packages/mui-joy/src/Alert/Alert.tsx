import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import IconButton from '../IconButton';
import CloseIcon from '../internal/svg-icons/Close';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getAlertUtilityClass } from './alertClasses';
import { AlertProps, AlertTypeMap } from './AlertProps';

const useUtilityClasses = (ownerState: AlertProps) => {
  const { variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    icon: ['icon'],
    message: ['message'],
    action: ['action'],
  };

  return composeClasses(slots, getAlertUtilityClass, {});
};

const AlertRoot = styled('div', {
  name: 'JoyAlert',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AlertProps }>(({ theme, ownerState }) => {
  return [
    {
      ...theme.typography.body2,
      backgroundColor: 'transparent',
      display: 'flex',
      padding: '8px 16px',
      borderRadius: theme.vars.radius.sm,
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const AlertIcon = styled('div', {
  name: 'JoyAlert',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})<{ ownerState: AlertProps }>(() => {
  return {
    marginRight: 12,
    display: 'flex',
    alignItems: 'center',
    fontSize: 22,
  };
});

const AlertMessage = styled('div', {
  name: 'JoyAlert',
  slot: 'Message',
  overridesResolver: (props, styles) => styles.message,
})<{ ownerState: AlertProps }>(() => {
  return {
    padding: '8px 0',
    minWidth: 0,
    overflow: 'auto',
  };
});

const AlertAction = styled('div', {
  name: 'JoyAlert',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: AlertProps }>(() => {
  return {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '4px 0 0 16px',
    marginLeft: 'auto',
    marginRight: -8,
  };
});

const Alert = React.forwardRef(function Alert(inProps, ref) {
  const props = useThemeProps<typeof inProps & AlertProps>({
    props: inProps,
    name: 'JoyAlert',
  });

  const {
    action,
    children,
    className,
    closeText = 'Close',
    color = 'primary',
    icon,
    onClose,
    role = 'alert',
    variant = 'solid',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <AlertRoot
      role={role}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {icon ? (
        <AlertIcon ownerState={ownerState} className={classes.icon}>
          {icon}
        </AlertIcon>
      ) : null}
      <AlertMessage ownerState={ownerState} className={classes.message}>
        {children}
      </AlertMessage>
      {action !== null ? (
        <AlertAction ownerState={ownerState} className={classes.action}>
          {action}
        </AlertAction>
      ) : null}
      {action === null && onClose ? (
        <AlertAction ownerState={ownerState} className={classes.action}>
          <IconButton
            size="sm"
            aria-label={closeText}
            title={closeText}
            color={color}
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </AlertAction>
      ) : null}
    </AlertRoot>
  );
}) as OverridableComponent<AlertTypeMap>;

Alert.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * Override the icon displayed before the children.
   * Set to `false` to remove the `icon`.
   */
  icon: PropTypes.node,
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Alert;
