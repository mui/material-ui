import * as React from 'react';
import { StandardProps } from '..';

export interface ExpansionPanelActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ExpansionPanelActionsClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

export type ExpansionPanelActionsClassKey = 'root' | 'spacing';

/**
 * ⚠️ The ExpansionPanelActions component was renamed to AccordionActions to use a more common naming convention.
 *
 * You should use `import { AccordionActions } from '@material-ui/core'`
 * or `import AccordionActions from '@material-ui/core/AccordionActions'`.
 * API:
 *
 * - [ExpansionPanelActions API](https://material-ui.com/api/expansion-panel-actions/)
 */
export default function ExpansionPanelActions(props: ExpansionPanelActionsProps): JSX.Element;
