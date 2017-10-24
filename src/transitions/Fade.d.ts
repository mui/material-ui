import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/transition';

export interface FadeProps extends TransitionProps {
  theme?: Theme;
  timeout?: TransitionDuration;
}

declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
