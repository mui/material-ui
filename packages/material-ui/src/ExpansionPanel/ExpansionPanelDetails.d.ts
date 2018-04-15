import * as React from 'react';
import { StandardProps } from '..';

export interface ExpansionPanelDetailsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ExpansionPanelDetailsClassKey> {}

export type ExpansionPanelDetailsClassKey = 'root';

declare const ExpansionPanelDetails: React.ComponentType<ExpansionPanelDetailsProps>;

export default ExpansionPanelDetails;
