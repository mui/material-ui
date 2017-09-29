import * as React from 'react';
import { StyledComponent } from '..';

export interface ListSubheaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'default' | 'primary' | 'inherit';
  inset?: boolean;
  disableSticky?: boolean;
}

export type ListSubheaderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorInherit'
  | 'inset'
  | 'sticky'
  ;

declare const ListSubheader: StyledComponent<ListSubheaderProps, ListSubheaderClassKey>;

export default ListSubheader;
