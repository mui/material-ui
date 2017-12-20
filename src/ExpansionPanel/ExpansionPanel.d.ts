import * as React from 'react';
import { StandardProps } from '../MuiProps';
import { CollapseProps } from '../transitions/Collapse';
import { PaperProps, PaperClassKey } from '../Paper';

export interface ExpansionPanelProps extends StandardProps<PaperProps, ExpansionPanelClassKey> {
  CollapseProps?: React.ComponentType<CollapseProps>;
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: React.ReactEventHandler<{}>;
}

export type ExpansionPanelClassKey = PaperClassKey | 'disabled' | 'expanded';

declare const ExpansionPanel: React.ComponentType<ExpansionPanelProps>;

export default ExpansionPanel;
