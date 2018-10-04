import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface SnackbarContentProps extends StandardProps<PaperProps, SnackbarContentClassKey> {
  action?: React.ReactNode;
  message?: React.ReactNode;
}

export type SnackbarContentClassKey = 'root' | 'message' | 'action';

declare const SnackbarContent: React.ComponentType<SnackbarContentProps>;

export default SnackbarContent;
