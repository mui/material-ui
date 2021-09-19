import * as React from 'react';
import { SxProps } from '@mui/system';
import { TypographyTypeMap } from '../Typography';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles';
import { DialogContentTextClasses } from './dialogContentTextClasses';

export interface DialogContentTextTypeMap<
  P = {},
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DialogContentTextClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  } & Omit<TypographyTypeMap['props'], 'classes'>;
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Dialogs](https://mui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContentText API](https://mui.com/api/dialog-content-text/)
 * - inherits [Typography API](https://mui.com/api/typography/)
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

export type DialogContentTextProps<
  D extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<DialogContentTextTypeMap<P, D>, D>;

export default DialogContentText;
