import * as React from 'react';
import { StandardProps } from '..';

export interface CardContentProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  CardContentClassKey
> {}

export type CardContentClassKey =
  | 'root'
  ;

declare const CardContent: React.ComponentType<CardContentProps>;

export default CardContent;
