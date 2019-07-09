import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export interface RatingProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, RatingClassKey, 'onChange'> {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disabled?: boolean;
  emptyIcon?: React.ReactElement;
  icon?: React.ReactElement;
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  max?: number;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
  onChangeHover?: (event: React.ChangeEvent<{}>, value: number) => void;
  precision?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  value: number | null;
}

export type RatingClassKey =
  | 'root'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'disabled'
  | 'readOnly'
  | 'icon'
  | 'iconEmpty'
  | 'iconFilled'
  | 'iconHover'
  | 'iconActive'
  | 'decimal';

declare const Rating: React.ComponentType<RatingProps>;

export default Rating;
