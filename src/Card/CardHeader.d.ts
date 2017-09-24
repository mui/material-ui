import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { CardContentProps } from './CardContent';

export type CardHeaderProps = {
  avatar?: React.ReactNode;
  subheader?: React.ReactNode;
  title?: React.ReactNode;
} & Partial<Omit<CardContentProps, 'title'>>;

declare const CardHeader: StyledComponent<CardHeaderProps>;

export default CardHeader;
