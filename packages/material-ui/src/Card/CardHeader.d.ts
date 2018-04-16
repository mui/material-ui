import * as React from 'react';
import { StandardProps } from '..';
import { CardContentProps } from './CardContent';

export interface CardHeaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardHeaderClassKey, 'title'> {
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  component?: React.ReactType<CardHeaderProps>;
  subheader?: React.ReactNode;
  title?: React.ReactNode;
}

export type CardHeaderClassKey = 'root' | 'avatar' | 'action' | 'content' | 'title' | 'subheader';

declare const CardHeader: React.ComponentType<CardHeaderProps>;

export default CardHeader;
