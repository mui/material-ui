import * as React from 'react';
import { StyledComponent } from '..';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

declare const CardContent: StyledComponent<CardContentProps>;

export default CardContent;
