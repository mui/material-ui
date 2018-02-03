import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';
import { ButtonBaseClassKey } from '../ButtonBase/ButtonBase';

export interface TabProps extends StandardProps<ButtonBaseProps, TabClassKey, 'onChange'> {
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string | React.ReactElement<any>;
  value?: any;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{ checked: boolean }>, value: any) => void;
  onClick?: React.EventHandler<any>;
  selected?: boolean;
  style?: React.CSSProperties;
  textColor?: string | 'secondary' | 'primary' | 'inherit';
}

export type TabClassKey =
  | ButtonBaseClassKey
  | 'rootLabelIcon'
  | 'rootPrimary'
  | 'rootPrimarySelected'
  | 'rootPrimaryDisabled'
  | 'rootSecondary'
  | 'rootSecondarySelected'
  | 'rootSecondaryDisabled'
  | 'rootInherit'
  | 'rootInheritSelected'
  | 'rootInheritDisabled'
  | 'fullWidth'
  | 'wrapper'
  | 'labelContainer'
  | 'label'
  | 'labelWrapped';

declare const Tab: React.ComponentType<TabProps>;

export default Tab;
