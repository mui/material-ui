'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import Typography from '../Typography';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';
import DialogContext from '../Dialog/DialogContext';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { TypographyTypeMap } from '../Typography';
import type { DialogTitleClasses } from './dialogTitleClasses';

export interface DialogTitleOwnProps extends Omit<TypographyTypeMap['props'], 'classes'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogTitleClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface DialogTitleTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & DialogTitleOwnProps;
  defaultComponent: RootComponent;
}

export type DialogTitleProps<
  RootComponent extends React.ElementType = DialogTitleTypeMap['defaultComponent'],
  AdditionalProps = { component?: React.ElementType | undefined },
> = OverrideProps<DialogTitleTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = DialogTitleProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};

const DialogTitleRoot = styled(Typography, {
  name: 'MuiDialogTitle',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  padding: '16px 24px',
  flex: '0 0 auto',
});

/**
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogTitle API](https://mui.com/material-ui/api/dialog-title/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 */
const DialogTitle = React.forwardRef(function DialogTitle(
  inProps: DialogTitleProps,
  ref: React.Ref<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogTitle',
  });

  const { className, id: idProp, ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const { titleId = idProp } = React.useContext(DialogContext);

  return (
    <DialogTitleRoot
      component="h2"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      variant="h6"
      id={idProp ?? titleId}
      {...other}
    />
  );
}) as OverridableComponent<DialogTitleTypeMap>;

DialogTitle.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default DialogTitle;
