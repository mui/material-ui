import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface BottomNavigationActionProps
  extends StandardProps<ButtonBaseProps, BottomNavigationActionClassKey, 'onChange'> {
  icon?: string | React.ReactElement<any>;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  onClick?: React.ReactEventHandler<any>;
  selected?: boolean;
  showLabel?: boolean;
  value?: any;
}

export type BottomNavigationActionClassKey =
  | ButtonBaseClassKey
  | 'selected'
  | 'selectedIconOnly'
  | 'wrapper'
  | 'label'
  | 'selectedLabel'
  | 'hiddenLabel'
  | 'icon';

declare const BottomNavigationAction: React.ComponentType<BottomNavigationActionProps>;

export default BottomNavigationAction;
