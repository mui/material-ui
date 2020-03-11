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

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/expansion-panels Expansion Panels}
 *
 * API:
 * - {@link https://material-ui.com/api/ExpansionPanel ExpansionPanel API}
 * - inherits {@link https://material-ui.com/api//api/paper Paper API}
 */
declare const ExpansionPanel: React.ComponentType<ExpansionPanelProps>;

export default ExpansionPanel;
