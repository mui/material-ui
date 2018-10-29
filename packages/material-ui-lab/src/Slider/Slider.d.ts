import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { SharedClassKey, SharedProps } from './shared';

export interface SliderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, SliderClassKey, 'onChange'> {
  component?: React.ReactType<React.HTMLAttributes<{}>>;
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
  onDragEnd?: (event: React.ChangeEvent<{}>) => void;
  onDragStart?: (event: React.ChangeEvent<{}>) => void;
  step?: number;
  thumb?: React.Component<SharedClassKey>;
  track?: React.Component<SharedClassKey>;
  value: number;
  vertical?: boolean;
}

export type SliderClassKey = 'root' | 'container' | SharedClassKey;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
