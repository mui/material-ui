'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import { getDialogContentTextUtilityClass } from './dialogContentTextClasses';
import type { TypographyTypeMap } from '../Typography';
import type { OverrideProps, OverridableComponent } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { DialogContentTextClasses } from './dialogContentTextClasses';

export interface DialogContentTextOwnProps extends Omit<TypographyTypeMap['props'], 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentTextClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface DialogContentTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & DialogContentTextOwnProps;
  defaultComponent: RootComponent;
}

export type DialogContentTextProps<
  RootComponent extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DialogContentTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = DialogContentTextProps;

const useUtilityClasses = (ownerState: OwnerState) => {
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
  shouldForwardProp: (prop: string) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiDialogContentText',
  slot: 'Root',
})<{ ownerState: OwnerState }>({});

/**
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContentText API](https://mui.com/material-ui/api/dialog-content-text/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 */
const DialogContentText = React.forwardRef(function DialogContentText(
  inProps: DialogContentTextProps,
  ref: React.Ref<HTMLElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiDialogContentText' });
  const { children, className, ...ownerState } = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <DialogContentTextRoot
      component="p"
      variant="body1"
      color="textSecondary"
      ref={ref}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      {...props}
      classes={classes}
    />
  );
}) as OverridableComponent<DialogContentTextTypeMap>;

DialogContentText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
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
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default DialogContentText;
