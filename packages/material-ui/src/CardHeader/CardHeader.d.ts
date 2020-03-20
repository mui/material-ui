import * as React from 'react';
import { TypographyProps } from '../Typography';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface CardHeaderTypeMap<
  Props = {},
  DefaultComponent extends React.ElementType = 'div',
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span'
> {
  props: Props & {
    action?: React.ReactNode;
    avatar?: React.ReactNode;
    disableTypography?: boolean;
    subheader?: React.ReactNode;
    subheaderTypographyProps?: TypographyProps<
      SubheaderTypographyComponent,
      { component?: SubheaderTypographyComponent }
    >;
    title?: React.ReactNode;
    titleTypographyProps?: TypographyProps<
      TitleTypographyComponent,
      { component?: TitleTypographyComponent }
    >;
  };
  defaultComponent: DefaultComponent;
  classKey: CardHeaderClassKey;
}
/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardHeader API](https://material-ui.com/api/card-header/)
 */
declare const CardHeader: OverridableCardHeader;

export interface OverridableCardHeader extends OverridableComponent<CardHeaderTypeMap> {
  <
    DefaultComponent extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
    Props = {},
    TitleTypographyComponent extends React.ElementType = 'span',
    SubheaderTypographyComponent extends React.ElementType = 'span'
  >(
    props: CardHeaderPropsWithComponent<
      DefaultComponent,
      Props,
      TitleTypographyComponent,
      SubheaderTypographyComponent
    >,
  ): JSX.Element;
}

export type CardHeaderClassKey = 'root' | 'avatar' | 'action' | 'content' | 'title' | 'subheader';

export type CardHeaderProps<
  DefaultComponent extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
  Props = {},
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span'
> = OverrideProps<
  CardHeaderTypeMap<
    Props,
    DefaultComponent,
    TitleTypographyComponent,
    SubheaderTypographyComponent
  >,
  DefaultComponent
>;

export type CardHeaderPropsWithComponent<
  DefaultComponent extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
  Props = {},
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span'
> = { component?: DefaultComponent } & CardHeaderProps<
  DefaultComponent,
  Props,
  TitleTypographyComponent,
  SubheaderTypographyComponent
>;

export default CardHeader;
