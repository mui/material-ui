'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
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
  const props = useDefaultProps({ props: inProps, name: 'MuiDialogContentText' });
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      typography: PropTypes.oneOfType([
        PropTypes.shape({
          lg: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          md: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          sm: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          xl: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          xs: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
        }),
        PropTypes.string,
      ]),
    }),
    PropTypes.shape({
      '__@iterator@30306': PropTypes.func.isRequired,
      '__@unscopables@34081': PropTypes.shape({
        '__@iterator@30306': PropTypes.bool,
        '__@unscopables@34081': PropTypes.bool,
        at: PropTypes.bool,
        concat: PropTypes.bool,
        entries: PropTypes.bool,
        every: PropTypes.bool,
        filter: PropTypes.bool,
        find: PropTypes.bool,
        findIndex: PropTypes.bool,
        flat: PropTypes.bool,
        flatMap: PropTypes.bool,
        forEach: PropTypes.bool,
        includes: PropTypes.bool,
        indexOf: PropTypes.bool,
        join: PropTypes.bool,
        keys: PropTypes.bool,
        lastIndexOf: PropTypes.bool,
        length: PropTypes.bool,
        map: PropTypes.bool,
        reduce: PropTypes.bool,
        reduceRight: PropTypes.bool,
        slice: PropTypes.bool,
        some: PropTypes.bool,
        toLocaleString: PropTypes.bool,
        toString: PropTypes.bool,
        values: PropTypes.bool,
      }).isRequired,
      at: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      typography: PropTypes.oneOfType([
        PropTypes.shape({
          lg: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          md: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          sm: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          xl: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
          xs: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'inherit',
            'overline',
            'subtitle1',
            'subtitle2',
          ]),
        }),
        PropTypes.string,
      ]),
      values: PropTypes.func.isRequired,
    }),
  ]),
};

export default DialogContentText;
