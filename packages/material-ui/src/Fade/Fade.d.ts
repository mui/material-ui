import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface FadeProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
