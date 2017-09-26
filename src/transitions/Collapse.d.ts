import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../internal/Transition';

export interface CollapseProps extends TransitionProps {
  theme?: Theme;
  transitionDuration?: number | string;
}

export type CollapseClassKey =
  | 'container'
  | 'entered'
  ;

declare const Collapse: StyledComponent<CollapseProps, CollapseClassKey>;

export default Collapse;
