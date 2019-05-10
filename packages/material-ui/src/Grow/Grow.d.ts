import * as React from 'react';
import { Omit } from '@material-ui/types';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  ref?: React.Ref<unknown>;
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
