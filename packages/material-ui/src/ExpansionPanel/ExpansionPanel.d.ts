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
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  TransitionProps?: TransitionProps;
}

export type ExpansionPanelClassKey = 'root' | 'rounded' | 'expanded' | 'disabled';

/**
 *
 * Demos:
 *
 * - [Expansion Panels](https://material-ui.com/components/expansion-panels/)
 *
 * API:
 *
 * - [ExpansionPanel API](https://material-ui.com/api/expansion-panel/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare const ExpansionPanel: React.ComponentType<ExpansionPanelProps>;

export default ExpansionPanel;
