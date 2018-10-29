import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { SharedClassKey, SharedProps, State } from '../Slider/shared';

export interface SliderTrackProps
  extends StandardProps<ButtonBaseProps, SliderTrackClassKey, 'onChange' | 'value'>,
    SharedProps {
  component?: React.ReactType<React.HTMLAttributes<{}>>;
  icon?: React.ReactElement<{}>;
  max: number;
  min: number;
  value: number;
  vertical: boolean;
  state: State;
}

export type SliderTrackClassKey = 'root' | 'selected' | 'unselected' | SharedClassKey;

declare const SliderTrack: React.ComponentType<SliderTrackProps>;

export default SliderTrack;
