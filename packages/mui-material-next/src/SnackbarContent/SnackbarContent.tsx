'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import Paper from '@mui/material/Paper';
import useThemeProps from '../styles/useThemeProps';
import { getSnackbarContentUtilityClass } from './snackbarContentClasses';
import { SnackbarContentOwnerState, SnackbarContentProps } from './SnackbarContent.types';
import { styled } from '../styles';

const useUtilityClasses = (ownerState: SnackbarContentOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    action: ['action'],
    message: ['message'],
  };

  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = styled(Paper, {
  name: 'MuiSnackbarContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SnackbarContentOwnerState }>(({ theme }) => {
  const { vars: tokens } = theme;

  return {
    ...theme.typography.body2,
    color: tokens.sys.color.inverseOnSurface,
    backgroundColor: tokens.sys.color.inverseSurface,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '6px 16px',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    flexGrow: 1,
    boxShadow: tokens.sys.elevation[3],
    [theme.breakpoints.up('sm')]: {
      flexGrow: 'initial',
      minWidth: 288,
    },
  };
});

const SnackbarContentMessage = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message',
  overridesResolver: (props, styles) => styles.message,
})<{ ownerState: SnackbarContentOwnerState }>({
  padding: '8px 0',
});

const SnackbarContentAction = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: SnackbarContentOwnerState }>({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 4,
  marginRight: -8,
});

const SnackbarContent = React.forwardRef(function SnackbarContent(
  inProps: SnackbarContentProps,
  ref: React.ForwardedRef<any>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiSnackbarContent' });
  const { action, className, message, role = 'alert', ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <SnackbarContentRoot
      role={role}
      square
      elevation={6}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      <SnackbarContentMessage className={classes.message} ownerState={ownerState}>
        {message}
      </SnackbarContentMessage>
      {action ? (
        <SnackbarContentAction className={classes.action} ownerState={ownerState}>
          {action}
        </SnackbarContentAction>
      ) : null}
    </SnackbarContentRoot>
  );
});

SnackbarContent.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
} as any;

export default SnackbarContent;
