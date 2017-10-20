import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface BottomNavigationButtonProps extends StandardProps<
  ButtonBaseProps,
  BottomNavigationButtonClassKey,
  'onChange'
> {
  icon?: string | React.ReactElement<any>;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  onClick?: React.ReactEventHandler<any>;
  selected?: boolean;
  showLabel?: boolean;
  value?: any;
}

export type BottomNavigationButtonClassKey =
  | ButtonBaseClassKey
  | 'selected'
  | 'selectedIconOnly'
  | 'wrapper'
  | 'label'
  | 'selectedLabel'
  | 'hiddenLabel'
  | 'icon'
  ;

declare const BottomNavigationButton: React.ComponentType<BottomNavigationButtonProps>;

export default BottomNavigationButton;
