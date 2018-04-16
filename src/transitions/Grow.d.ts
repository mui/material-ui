import * as React from 'react';
import { Omit } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from './transition';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
