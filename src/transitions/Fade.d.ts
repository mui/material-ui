import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/theme';
import { TransitionProps } from '../internal/Transition';

export interface FadeProps extends TransitionProps {
  theme?: Theme;
  enterTransitionDuration?: number;
  leaveTransitionDuration?: number;
}

export default class Fade extends StyledComponent<FadeProps> {}
