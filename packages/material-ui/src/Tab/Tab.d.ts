import * as React from 'react';
import { ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const Tab: ExtendButtonBase<{
  props: {
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
  defaultComponent: 'div';
  classKey: TabClassKey;
}>;

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

export type TabProps = SimplifiedPropsOf<typeof Tab>;

export default Tab;
