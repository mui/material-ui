import * as React from 'react';
import { SxProps } from '@mui/system';
import { TypographyTypeMap } from '../Typography';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles';
import { DialogContentTextClasses } from './dialogContentTextClasses';

export interface DialogContentTextTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DialogContentTextClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  } & Omit<TypographyTypeMap['props'], 'classes'>;
  defaultComponent: DefaultComponent;
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
