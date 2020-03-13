import * as React from 'react';
import { StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface CardHeaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardHeaderClassKey, 'title'> {
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disableTypography?: boolean;
  subheader?: React.ReactNode;
  subheaderTypographyProps?: Partial<TypographyProps>;
  title?: React.ReactNode;
  titleTypographyProps?: Partial<TypographyProps>;
}

export type CardHeaderClassKey = 'root' | 'avatar' | 'action' | 'content' | 'title' | 'subheader';

declare const CardHeader: React.ComponentType<CardHeaderProps>;

export default CardHeader;
