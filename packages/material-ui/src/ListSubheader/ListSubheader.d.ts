import * as React from 'react';
import { StandardProps } from '..';

export interface ListSubheaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListSubheaderClassKey> {
  color?: 'default' | 'primary' | 'inherit';
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disableGutters?: boolean;
  disableSticky?: boolean;
  inset?: boolean;
}

export type ListSubheaderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorInherit'
  | 'inset'
  | 'sticky'
  | 'gutters';

declare const ListSubheader: React.ComponentType<ListSubheaderProps>;

export default ListSubheader;
