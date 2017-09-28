import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../internal/Transition';

export interface GrowProps extends TransitionProps {
  theme?: Theme;
  transitionDuration?: number | string;
}

export type GrowClassKey = never;

declare const Grow: StyledComponent<GrowProps, GrowClassKey>;

export default Grow;
