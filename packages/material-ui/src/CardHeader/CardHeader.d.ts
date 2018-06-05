import * as React from 'react';
import { StandardProps } from '..';
import { CardContentProps } from '../CardContent';

export interface CardHeaderProps<C>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardHeaderClassKey, 'title'> {
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  component?: React.ReactType<C>;
  subheader?: React.ReactNode;
  title?: React.ReactNode;
}

export type CardHeaderClassKey = 'root' | 'avatar' | 'action' | 'content' | 'title' | 'subheader';

declare class CardHeader<C> extends React.Component<C & CardHeaderProps<C>> {}

export default CardHeader;
