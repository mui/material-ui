import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { PaperClassKey } from '../Paper/Paper';

export interface SnackbarContentProps extends StandardProps<
  PaperProps,
  SnackbarContentClasskey
> {
  action?: React.ReactElement<any>;
  message: React.ReactElement<any> | string;
}

export type SnackbarContentClasskey =
  | PaperClassKey
  | 'message'
  | 'action'
  ;

declare const SnackbarContent: React.ComponentType<SnackbarContentProps>;

export default SnackbarContent;
