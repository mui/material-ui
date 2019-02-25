import * as React from 'react';
import { StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';
import { PaperProps } from '../Paper';

export interface ExpansionPanelProps
  extends StandardProps<PaperProps, ExpansionPanelClassKey, 'onChange'> {
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  TransitionProps?: TransitionProps;
}

export type ExpansionPanelClassKey = 'root' | 'rounded' | 'expanded' | 'disabled';

declare const ExpansionPanel: React.ComponentType<ExpansionPanelProps>;

export default ExpansionPanel;
