import * as React from 'react';
import { StyledComponent } from '..';

export interface BackdropProps {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  [prop: string]: any;
}

export default class Backdrop extends StyledComponent<BackdropProps> {}
