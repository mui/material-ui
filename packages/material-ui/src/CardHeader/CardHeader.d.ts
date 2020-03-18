import * as React from 'react';
import { TypographyProps } from '../Typography';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface CardHeaderTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    action?: React.ReactNode;
    avatar?: React.ReactNode;
    disableTypography?: boolean;
    subheader?: React.ReactNode;
    subheaderTypographyProps?: Partial<TypographyProps>;
    title?: React.ReactNode;
    titleTypographyProps?: Partial<TypographyProps>;
  };
  defaultComponent: D;
  classKey: CardHeaderClassKey;
}

declare const CardHeader: OverridableComponent<CardHeaderTypeMap>;

export type CardHeaderClassKey = 'root' | 'avatar' | 'action' | 'content' | 'title' | 'subheader';

export type CardHeaderProps<
  D extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardHeaderTypeMap<P, D>, D>;

export default CardHeader;
