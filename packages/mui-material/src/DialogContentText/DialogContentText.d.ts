import * as React from 'react';
import { SxProps } from '@mui/system';
import { TypographyTypeMap } from '../Typography';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles';
import { DialogContentTextClasses } from './dialogContentTextClasses';

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
 * - [Dialog](https://v6.mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContentText API](https://v6.mui.com/material-ui/api/dialog-content-text/)
 * - inherits [Typography API](https://v6.mui.com/material-ui/api/typography/)
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

export type DialogContentTextProps<
  RootComponent extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DialogContentTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default DialogContentText;
