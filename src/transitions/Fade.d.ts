import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../internal/Transition';

export interface FadeProps extends TransitionProps {
  theme?: Theme;
  enterTransitionDuration?: number;
  leaveTransitionDuration?: number;
}

export type FadeClassKey = never;

declare const Fade: StyledComponent<FadeProps, FadeClassKey>;

export default Fade;
