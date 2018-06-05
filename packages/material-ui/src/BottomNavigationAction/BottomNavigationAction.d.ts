import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface BottomNavigationActionProps<C>
  extends StandardProps<ButtonBaseProps<C>, BottomNavigationActionClassKey, 'onChange'> {
  icon?: string | React.ReactElement<any>;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  onClick?: React.ReactEventHandler<any>;
  selected?: boolean;
  showLabel?: boolean;
  value?: any;
}

export type BottomNavigationActionClassKey = 'root' | 'selected' | 'iconOnly' | 'wrapper' | 'label';

declare class BottomNavigationAction<C> extends React.Component<C & BottomNavigationActionProps<C>> {}

export default BottomNavigationAction;
