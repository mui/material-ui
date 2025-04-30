'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { emphasize } from '@mui/system/colorManipulator';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Paper from '../Paper';
import { getSnackbarContentUtilityClass } from './snackbarContentClasses';
import { light, dark } from '../styles/createPalette';

const useUtilityClasses = (ownerState) => {
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
})(
  memoTheme(({ theme }) => {
    const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
    const backgroundColor = emphasize(theme.palette.background.default, emphasis);
    let color;
    if (theme.colorSpace) {
      color = theme.palette.mode === 'light' ? dark.text.primary : light.text.primary;
    } else {
      color = theme.palette.getContrastText(backgroundColor); // TODO: remove `getContrastText` in v8
    }

    return {
      ...theme.typography.body2,
      color: theme.vars ? theme.vars.palette.SnackbarContent.color : color,
      backgroundColor: theme.vars ? theme.vars.palette.SnackbarContent.bg : backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 16px',
      borderRadius: (theme.vars || theme).shape.borderRadius,
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        flexGrow: 'initial',
        minWidth: 288,
      },
    };
  }),
);

const SnackbarContentMessage = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message',
})({
  padding: '8px 0',
});

const SnackbarContentAction = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action',
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8,
});

const SnackbarContent = React.forwardRef(function SnackbarContent(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSnackbarContent' });
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default SnackbarContent;
