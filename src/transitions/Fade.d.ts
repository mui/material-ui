import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/Transition';

export interface FadeProps extends TransitionProps {
  theme?: Theme;
  transitionDuration?: TransitionDuration;
}

declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
