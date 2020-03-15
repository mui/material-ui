import * as React from 'react';
import { StandardProps } from '..';

export interface ExpansionPanelActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ExpansionPanelActionsClassKey> {}

export type ExpansionPanelActionsClassKey = 'root' | 'spacing';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/expansion-panels/ Expansion Panels}
 *
 * API:
 * - {@link https://material-ui.com/api/expansion-panel-actions/ ExpansionPanelActions API}
 *
 */
declare const ExpansionPanelActions: React.ComponentType<ExpansionPanelActionsProps>;

export default ExpansionPanelActions;
