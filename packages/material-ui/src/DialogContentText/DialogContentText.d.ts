import * as React from 'react';
import { TypographyTypeMap } from '../Typography';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';

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
