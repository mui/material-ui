import * as React from 'react';
import { StyledComponent } from '..';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  disableGutters?: boolean;
}

declare const Toolbar: StyledComponent<ToolbarProps>;

export default Toolbar;
