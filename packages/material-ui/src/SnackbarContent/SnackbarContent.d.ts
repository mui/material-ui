import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface SnackbarContentProps<C = {}> extends StandardProps<PaperProps<C>, SnackbarContentClassKey> {
  action?: React.ReactElement<any>;
  message: React.ReactElement<any> | string;
}

export type SnackbarContentClassKey = 'root' | 'message' | 'action';

declare class SnackbarContent<C> extends React.Component<C & SnackbarContentProps<C>> {}

export default SnackbarContent;
