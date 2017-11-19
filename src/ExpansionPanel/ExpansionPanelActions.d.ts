import * as React from 'react';
import { StandardProps } from '..';

export interface ExpansionPanelActionsProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
    ExpansionPanelActionsClassKey
> {}

export type ExpansionPanelActionsClassKey =
  | 'root'
  | 'action'
  ;

declare const ExpansionPanelActions: React.ComponentType<ExpansionPanelActionsProps>;

export default ExpansionPanelActions;
