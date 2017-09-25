import * as React from 'react';
import { StyledComponent } from '..';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  component?: React.ReactType;
  elevation?: number;
  square?: boolean;
}

declare const Paper: StyledComponent<PaperProps>;

export default Paper;
