import * as React from 'react';
import { StyledComponent } from '..';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  disableGutters?: boolean;
}

export type ToolbarClassKey =
  | 'root'
  | 'gutters'
  ;

declare const Toolbar: StyledComponent<ToolbarProps, ToolbarClassKey>;

export default Toolbar;
