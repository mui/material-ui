import * as React from 'react';
import { StandardProps } from '..';

export interface ListSubheaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListSubheaderClassKey> {
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'inherit';
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disableGutters?: boolean;
  disableSticky?: boolean;
  inset?: boolean;
}

export type ListSubheaderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError'
  | 'colorInherit'
  | 'inset'
  | 'sticky'
  | 'gutters';

declare const ListSubheader: React.ComponentType<ListSubheaderProps>;

export default ListSubheader;
