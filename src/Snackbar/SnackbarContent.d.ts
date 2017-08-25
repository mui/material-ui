import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';

export interface SnackbarContentProps extends PaperProps {
  action?: React.ReactElement<any>;
  message: React.ReactElement<any> | string;
}

export default class SnackbarContent extends StyledComponent<
  SnackbarContentProps
> {}
