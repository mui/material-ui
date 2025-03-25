import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { TabClasses } from './tabClasses';

export interface TabOwnProps {
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children?: null;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabClasses>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * The icon to display.
   */
  icon?: string | React.ReactElement<unknown>;
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition?: 'top' | 'bottom' | 'start' | 'end';
  /**
   * The label element.
   */
  label?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value?: any;
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped?: boolean;
}

export type TabTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & TabOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Tabs](https://v6.mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [Tab API](https://v6.mui.com/material-ui/api/tab/)
 * - inherits [ButtonBase API](https://v6.mui.com/material-ui/api/button-base/)
 */
declare const Tab: ExtendButtonBase<TabTypeMap>;

export type TabProps<
  RootComponent extends React.ElementType = TabTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TabTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Tab;
