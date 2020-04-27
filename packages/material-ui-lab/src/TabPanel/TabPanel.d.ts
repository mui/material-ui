import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box';

export type TabPanelClassKey = 'root';

export interface TabPanelProps extends StandardProps<BoxProps, TabPanelClassKey> {
  /**
   * The currently active value. Must be the same value that is passed to `Tabs`.
   */
  activeValue?: unknown;
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`
   */
  value?: unknown;
}

/**
 *
 * API:
 *
 * - [TabPanel API](https://material-ui.com/api/tab-panel/)
 */
export default function Rating(props: TabPanelProps): JSX.Element;
