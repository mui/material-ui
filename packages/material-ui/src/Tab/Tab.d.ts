import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TabProps<C = {}> extends StandardProps<ButtonBaseProps<C>, TabClassKey, 'onChange'> {
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
  | 'root'
  | 'labelIcon'
  | 'textColorInherit'
  | 'textColorPrimary'
  | 'textColorSecondary'
  | 'selected'
  | 'disabled'
  | 'fullWidth'
  | 'wrapper'
  | 'labelContainer'
  | 'label'
  | 'labelWrapped';

declare class Tab<C> extends React.Component<C & TabProps<C>> {}

export default Tab;
