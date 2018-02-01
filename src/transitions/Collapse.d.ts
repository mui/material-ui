import * as React from 'react';
import { StandardProps } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps, TransitionDuration } from './transition';

export interface CollapseProps
  extends StandardProps<TransitionProps, CollapseClassKey> {
  children?: React.ReactNode;
  collapsedHeight?: string;
  component?: React.ReactType<CollapseProps>;
  theme?: Theme;
  timeout?: TransitionDuration;
}

export type CollapseClassKey = 'container' | 'entered';

declare const Collapse: React.ComponentType<CollapseProps>;

export default Collapse;
