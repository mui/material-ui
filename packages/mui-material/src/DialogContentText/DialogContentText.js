import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import { getDialogContentTextUtilityClass } from './dialogContentTextClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  const composedClasses = composeClasses(slots, getDialogContentTextUtilityClass, classes);

  return {
    ...classes, // forward classes to the Typography
    ...composedClasses,
  };
};

const DialogContentTextRoot = styled(Typography, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiDialogContentText',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});

const DialogContentText = React.forwardRef(function DialogContentText(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiDialogContentText' });
  const { children, className, ...ownerState } = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <DialogContentTextRoot
      component="p"
      variant="body1"
      color="text.secondary"
      ref={ref}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      {...props}
      classes={classes}
    />
  );
});

DialogContentText.propTypes /* remove-proptypes */ = {
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
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DialogContentText;
