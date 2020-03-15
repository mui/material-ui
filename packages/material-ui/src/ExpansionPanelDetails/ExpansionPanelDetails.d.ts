import * as React from 'react';
import { StandardProps } from '..';

export interface ExpansionPanelDetailsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ExpansionPanelDetailsClassKey> {}

export type ExpansionPanelDetailsClassKey = 'root';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/expansion-panels/ Expansion Panels}
 *
 * API:
 * - {@link https://material-ui.com/api/ExpansionPanelDetails ExpansionPanelDetails API}
 *
 */
declare const ExpansionPanelDetails: React.ComponentType<ExpansionPanelDetailsProps>;

export default ExpansionPanelDetails;
