import * as React from 'react';
import { StyledComponent } from '..';

export interface BackdropProps {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  [prop: string]: any;
}

export type BackdropClassKey =
  | 'root'
  | 'invisible'
  ;

declare const Backdrop: StyledComponent<BackdropProps, BackdropClassKey>;

export default Backdrop;
