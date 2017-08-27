import * as React from 'react';
import { StyledComponent } from '..';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  disableGutters?: boolean;
}

export default class Toolbar extends StyledComponent<ToolbarProps> {}
