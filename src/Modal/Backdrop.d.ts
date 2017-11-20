import * as React from 'react';
import { StandardProps } from '..';

export interface BackdropProps extends StandardProps<{}, BackdropClassKey> {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  [prop: string]: any;
}

export type BackdropClassKey =
  | 'root'
  | 'invisible'
  ;

declare const Backdrop: React.ComponentType<BackdropProps>;

export default Backdrop;
