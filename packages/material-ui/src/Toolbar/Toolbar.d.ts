import * as React from 'react';
import { StandardProps } from '..';

export interface ToolbarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ToolbarClassKey> {
  variant?: 'regular' | 'dense';
  disableGutters?: boolean;
}

export type ToolbarClassKey = 'root' | 'gutters' | 'regular' | 'dense';

declare const Toolbar: React.ComponentType<ToolbarProps>;

export default Toolbar;
