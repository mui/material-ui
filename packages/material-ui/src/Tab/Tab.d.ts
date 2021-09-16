import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type TabTypeMap<P = {}, D extends React.ElementType = 'div'> = ExtendButtonBaseTypeMap<{
  props: P & {
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    icon?: string | React.ReactElement;
    label?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<{ checked: boolean }>, value: any) => void;
    onClick?: React.EventHandler<any>;
    selected?: boolean;
    style?: React.CSSProperties;
    textColor?: string | 'secondary' | 'primary' | 'inherit';
    value?: any;
    wrapped?: boolean;
  };
  defaultComponent: D;
  classKey: TabClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/api/tab/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
 */
declare const Tab: ExtendButtonBase<TabTypeMap>;

export type TabClassKey =
  | 'root'
  | 'labelIcon'
  | 'textColorInherit'
  | 'textColorPrimary'
  | 'textColorSecondary'
  | 'selected'
  | 'disabled'
  | 'fullWidth'
  | 'wrapped'
  | 'wrapper';

export type TabProps<
  D extends React.ElementType = TabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabTypeMap<P, D>, D>;

export default Tab;
