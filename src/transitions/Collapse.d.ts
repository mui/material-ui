import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/Transition';

export interface CollapseProps extends Partial<Omit<TransitionProps, 'children'>> {
  children?: React.ReactNode;
  theme?: Theme;
  transitionDuration?: TransitionDuration | 'auto';
}

export type CollapseClassKey =
  | 'container'
  | 'entered'
  ;

declare const Collapse: StyledComponent<CollapseProps, CollapseClassKey>;

export default Collapse;
