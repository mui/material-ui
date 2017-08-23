import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface BottomNavigationButtonProps extends ButtonBaseProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
  onClick?: React.ReactEventHandler<any>;
  selected?: boolean;
  showLabel?: boolean;
  value?: number;
}

export default class BottomNavigationButton extends StyledComponent<
  BottomNavigationButtonProps
> {}
