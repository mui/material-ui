import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export type TabPanelClassKey = 'root';

export interface TabPanelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TabPanelClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: string;
}

/**
 *
 * API:
 *
 * - [TabPanel API](https://material-ui.com/api/tab-panel/)
 */
export default function TabPanel(props: TabPanelProps): JSX.Element;
