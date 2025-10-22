import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@mui/material/internal';
import { CreateThemeComponent, Theme } from '@mui/material/stylesOptimized';
import { SxProps } from '@mui/system';
import { TabPanelClasses, TabPanelClassKey } from './tabPanelClasses';

export interface TabPanelProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabPanelClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: string | number;
  /**
   * Always keep the children in the DOM.
   * @default false
   */
  keepMounted?: boolean;
}

export type TabPanelTheme = CreateThemeComponent<TabPanelClassKey, TabPanelProps>;

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabPanel API](https://mui.com/material-ui/api/tab-panel/)
 */
export default function TabPanel(props: TabPanelProps): React.JSX.Element;
