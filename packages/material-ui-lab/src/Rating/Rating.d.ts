import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface IconContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export interface RatingProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, RatingClassKey, 'onChange'> {
  defaultValue?: number;
  disabled?: boolean;
  emptyIcon?: React.ReactElement;
  getLabelText?: (value: number) => string;
  icon?: React.ReactElement;
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  max?: number;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: number | null) => void;
  onChangeActive?: (event: React.ChangeEvent<{}>, value: number) => void;
  precision?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  value?: number | null;
}

export type RatingClassKey =
  | 'root'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'readOnly'
  | 'disabled'
  | 'focusVisible'
  | 'visuallyhidden'
  | 'pristine'
  | 'label'
  | 'icon'
  | 'iconEmpty'
  | 'iconFilled'
  | 'iconHover'
  | 'iconFocus'
  | 'iconActive'
  | 'decimal';

declare const Rating: React.ComponentType<RatingProps>;

export default Rating;
