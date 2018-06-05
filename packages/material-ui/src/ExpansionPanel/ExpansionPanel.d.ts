import * as React from 'react';
import { StandardProps } from '..';
import { CollapseProps } from '../Collapse';
import { PaperProps } from '../Paper';

export interface ExpansionPanelProps<C = {}>
  extends StandardProps<PaperProps<C>, ExpansionPanelClassKey, 'onChange'> {
  CollapseProps?: Partial<CollapseProps<C>>;
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}

export type ExpansionPanelClassKey = 'root' | 'expanded' | 'disabled';

declare class ExpansionPanel<C> extends React.Component<ExpansionPanelProps<C>> {}

export default ExpansionPanel;
