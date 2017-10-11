import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { CardContentProps } from './CardContent';

export type CardHeaderProps = {
  avatar?: React.ReactNode;
  subheader?: React.ReactNode;
  title?: React.ReactNode;
} & Omit<CardContentProps, 'title'>;

export type CardHeaderClassKey =
  | 'root'
  | 'avatar'
  | 'content'
  | 'title'
  | 'subheader'
  ;

declare const CardHeader: StyledComponent<CardHeaderProps, CardHeaderClassKey>;

export default CardHeader;
