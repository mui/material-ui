import * as React from 'react';
import { StandardProps } from '..';

export interface ListSubheaderProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  ListSubheaderClassKey
> {
  component?: string | React.ComponentType<ListSubheaderProps>;
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

declare const ListSubheader: React.ComponentType<ListSubheaderProps>;

export default ListSubheader;
