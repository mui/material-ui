import * as React from 'react';
import { StyledComponent } from '..';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export type CardContentClassKey =
  | 'root'
  ;

declare const CardContent: StyledComponent<CardContentProps, CardContentClassKey>;

export default CardContent;
