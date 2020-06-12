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
    /**
     * The action to display in the card header.
     */
    action?: React.ReactNode;
    /**
     * The Avatar for the Card Header.
     */
    avatar?: React.ReactNode;
    /**
     * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
     * This can be useful to render an alternative Typography variant by wrapping
     * the `title` text, and optional `subheader` text
     * with the Typography component.
     */
    disableTypography?: boolean;
    /**
     * The content of the component.
     */
    subheader?: React.ReactNode;
    /**
     * These props will be forwarded to the subheader
     * (as long as disableTypography is not `true`).
     */
    subheaderTypographyProps?: TypographyProps<
      SubheaderTypographyComponent,
      { component?: SubheaderTypographyComponent }
    >;
    /**
     * The content of the Card Title.
     */
    title?: React.ReactNode;
    /**
     * These props will be forwarded to the title
     * (as long as disableTypography is not `true`).
     */
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
    >
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
> = {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: DefaultComponent;
} & CardHeaderProps<
  DefaultComponent,
  Props,
  TitleTypographyComponent,
  SubheaderTypographyComponent
>;

export default CardHeader;
