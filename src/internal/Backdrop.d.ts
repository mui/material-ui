import * as React from 'react';
import { StyledComponent } from '..';

export interface BackdropProps {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  [prop: string]: any;
}

declare const Backdrop: StyledComponent<BackdropProps>;

export default Backdrop;
