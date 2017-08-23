import * as React from 'react';
import { StyledComponent } from '..';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  component?: React.ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
  rootRef?: React.Ref<any>;
  subheader?: React.ReactElement<any>;
}

export default class List extends StyledComponent<ListProps> {}
