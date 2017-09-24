import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../internal/Transition';

export interface CollapseProps extends TransitionProps {
  theme?: Theme;
  transitionDuration?: number | string;
}

declare const Collapse: StyledComponent<CollapseProps>;

export default Collapse;
