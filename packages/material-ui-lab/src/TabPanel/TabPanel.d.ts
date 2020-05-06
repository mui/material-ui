import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box';

export type TabPanelClassKey = 'root';

export interface TabPanelProps extends StandardProps<BoxProps, TabPanelClassKey> {
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
