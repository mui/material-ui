import * as React from 'react';
import { StandardProps } from '..';

export interface ExpansionPanelActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ExpansionPanelActionsClassKey> {}

export type ExpansionPanelActionsClassKey = 'root' | 'spacing';

/**
 *
 * Demos:
 *
 * - [Expansion Panels](https://material-ui.com/components/expansion-panels/)
 *
 * API:
 *
 * - [ExpansionPanelActions API](https://material-ui.com/api/expansion-panel-actions/)
 */
declare const ExpansionPanelActions: React.ComponentType<ExpansionPanelActionsProps>;

export default ExpansionPanelActions;
