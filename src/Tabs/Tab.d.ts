import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export type TabProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string | React.ReactElement<any>;
  value?: any;
  label?: React.ReactNode;
  onChange?: (
    event: React.ChangeEvent<{ checked: boolean }>,
    value: any
  ) => void;
  onClick?: React.EventHandler<any>;
  selected?: boolean;
  style?: object;
  textColor?: string | 'accent' | 'primary' | 'inherit';
} & Omit<ButtonBaseProps, 'onChange'>;

export type TabClassKey =
  | 'root'
  | 'rootLabelIcon'
  | 'rootAccent'
  | 'rootAccentSelected'
  | 'rootAccentDisabled'
  | 'rootPrimary'
  | 'rootPrimarySelected'
  | 'rootPrimaryDisabled'
  | 'rootInherit'
  | 'rootInheritSelected'
  | 'rootInheritDisabled'
  | 'fullWidth'
  | 'wrapper'
  | 'labelContainer'
  | 'label'
  | 'labelWrapped'
  ;

declare const Tab: StyledComponent<TabProps, TabClassKey>;

export default Tab;
