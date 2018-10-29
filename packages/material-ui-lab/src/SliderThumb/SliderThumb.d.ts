import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { SharedClassKey, SharedProps, State } from '../Slider/shared';

export interface SliderThumbProps
  extends StandardProps<ButtonBaseProps, SliderThumbClassKey, 'onChange' | 'value'>,
    SharedProps {
  component?: React.ReactType<React.HTMLAttributes<{}>>;
  icon?: React.ReactElement<{}>;
  max: number;
  min: number;
  value: number;
  vertical: boolean;
  state: State;
}

export type SliderThumbClassKey = 'button' | 'icon' | 'iconWrapper' | 'wrapper' | SharedClassKey;

declare const SliderThumb: React.ComponentType<SliderThumbProps>;

export default SliderThumb;
