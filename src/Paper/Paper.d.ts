import * as React from 'react';
import { StyledComponent } from '..';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  component?: React.ReactType;
  elevation?: number;
  square?: boolean;
}

export default class Paper extends StyledComponent<PaperProps> {}
