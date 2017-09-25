import * as React from 'react';
import { StyledComponent } from '..';

export interface ListSubheaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'default' | 'primary' | 'inherit';
  inset?: boolean;
  disableSticky?: boolean;
}

declare const ListSubheader: StyledComponent<ListSubheaderProps>;

export default ListSubheader;
