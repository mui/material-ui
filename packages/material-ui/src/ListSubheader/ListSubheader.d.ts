import * as React from 'react';
import { StandardProps } from '..';

export interface ListSubheaderProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListSubheaderClassKey> {
  component?: React.ReactType<C>;
  color?: 'default' | 'primary' | 'inherit';
  inset?: boolean;
  disableSticky?: boolean;
}

export type ListSubheaderClassKey = 'root' | 'colorPrimary' | 'colorInherit' | 'inset' | 'sticky';

declare class ListSubheader<C> extends React.Component<C & ListSubheaderProps<C>> {}

export default ListSubheader;
