import * as React from 'react';
import { StyledComponent } from '..';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default class CardContent extends StyledComponent<CardContentProps> {}
