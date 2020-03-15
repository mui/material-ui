import * as React from 'react';
import { StandardProps } from '..';
import { TypographyTypeMap } from '../Typography';
import { OverrideProps, OverridableTypeMap, OverridableComponent } from '../OverridableComponent';

export interface DialogContentTextTypeMap<
  P = {},
  D extends React.ElementType = TypographyTypeMap['defaultComponent']
> {
  props: P & TypographyTypeMap['props'];
  defaultComponent: D;
  classKey: DialogContentTextClassKey;
}

export type DialogContentTextClassKey = 'root';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/dialogs/ Dialogs}
 *
 * API:
 * - {@link https://material-ui.com/api/dialog-content-text/ DialogContentText API}
 * - inherits {@link https://material-ui.com/api/typography/ Typography API}
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

export type DialogContentTextProps<
  D extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogContentTextTypeMap<P, D>, D>;

export default DialogContentText;
