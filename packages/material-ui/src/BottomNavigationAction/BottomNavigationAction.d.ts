import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface BottomNavigationActionProps
  extends StandardProps<ButtonBaseProps, BottomNavigationActionClassKey, 'onChange'> {
  icon?: string | React.ReactElement;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  onClick?: React.ReactEventHandler<any>;
  selected?: boolean;
  showLabel?: boolean;
  value?: any;
}

export type BottomNavigationActionClassKey = 'root' | 'selected' | 'iconOnly' | 'wrapper' | 'label';

declare const BottomNavigationAction: React.ComponentType<BottomNavigationActionProps>;

export default BottomNavigationAction;
