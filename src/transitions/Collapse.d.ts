import * as React from 'react';
import { StandardProps } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/transition';

export interface CollapseProps extends StandardProps<
  TransitionProps,
  CollapseClassKey,
  'children'
> {
  children?: React.ReactNode;
  collapsedHeight?: string;
  component?: string | React.ComponentType<CollapseProps>;
  containerProps?: Object;
  theme?: Theme;
  timeout?: TransitionDuration | 'auto';
}

export type CollapseClassKey =
  | 'container'
  | 'entered'
  ;

declare const Collapse: React.ComponentType<CollapseProps>;

export default Collapse;
