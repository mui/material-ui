import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface BottomNavigationButtonProps extends ButtonBaseProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  onClick?: React.ReactEventHandler<any>;
  selected?: boolean;
  showLabel?: boolean;
  value?: any;
}

export default class BottomNavigationButton extends StyledComponent<
  BottomNavigationButtonProps
> {}
