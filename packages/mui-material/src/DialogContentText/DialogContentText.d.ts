import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { TypographyTypeMap } from '../Typography';
import type { OverrideProps, OverridableComponent } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { DialogContentTextClasses } from './dialogContentTextClasses';

export interface DialogContentTextOwnProps extends Omit<TypographyTypeMap['props'], 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentTextClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface DialogContentTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & DialogContentTextOwnProps;
  defaultComponent: RootComponent;
}

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
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

export type DialogContentTextProps<
  RootComponent extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DialogContentTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default DialogContentText;
