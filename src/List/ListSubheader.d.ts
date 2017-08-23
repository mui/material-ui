import * as React from 'react';
import { StyledComponent } from '..';

export interface ListSubheaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'default' | 'primary' | 'inherit';
  inset?: boolean;
}

export default class ListSubheader extends StyledComponent<
  ListSubheaderProps
> {}
