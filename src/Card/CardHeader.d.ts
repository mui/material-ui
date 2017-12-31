import * as React from 'react';
import { StandardProps } from '..';
import { CardContentProps, CardContentClassKey } from './CardContent';

export interface CardHeaderProps
  extends StandardProps<CardContentProps, CardHeaderClassKey, 'title'> {
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  component?: React.ReactType<CardHeaderProps>;
  subheader?: React.ReactNode;
  title?: React.ReactNode;
}

export type CardHeaderClassKey = CardContentClassKey | 'avatar' | 'content' | 'title' | 'subheader';

declare const CardHeader: React.ComponentType<CardHeaderProps>;

export default CardHeader;
