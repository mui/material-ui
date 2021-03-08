import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { TypographyTypeMap } from '../Typography';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles';

export interface DialogContentTextTypeMap<
  P = {},
  D extends React.ElementType = TypographyTypeMap['defaultComponent']
> {
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
    };
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  } & Omit<TypographyTypeMap['props'], 'classes'>;
  defaultComponent: D;
}

export type DialogContentTextClassKey = keyof NonNullable<
  DialogContentTextTypeMap['props']['classes']
>;

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContentText API](https://material-ui.com/api/dialog-content-text/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

export type DialogContentTextProps<
  D extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogContentTextTypeMap<P, D>, D>;

export default DialogContentText;
