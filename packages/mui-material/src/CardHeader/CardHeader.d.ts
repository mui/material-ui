import * as React from 'react';
import { SxProps } from '@mui/system';
import { TypographyProps } from '../Typography';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '..';
import { CardHeaderClasses } from './cardHeaderClasses';

export interface CardHeaderOwnProps<
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span',
> {
  /**
   * The action to display in the card header.
   */
  action?: React.ReactNode;
  /**
   * The Avatar element to display.
   */
  avatar?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardHeaderClasses>;
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
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
    {
      component?: SubheaderTypographyComponent;
    }
  >;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The content of the component.
   */
  title?: React.ReactNode;
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  titleTypographyProps?: TypographyProps<
    TitleTypographyComponent,
    {
      component?: TitleTypographyComponent;
    }
  >;
}

export interface CardHeaderTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps &
    CardHeaderOwnProps<TitleTypographyComponent, SubheaderTypographyComponent>;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Card](https://next.mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardHeader API](https://next.mui.com/material-ui/api/card-header/)
 */
declare const CardHeader: OverridableCardHeader;

export interface OverridableCardHeader extends OverridableComponent<CardHeaderTypeMap> {
  <
    RootComponent extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
    AdditionalProps = {},
    TitleTypographyComponent extends React.ElementType = 'span',
    SubheaderTypographyComponent extends React.ElementType = 'span',
  >(
    props: CardHeaderPropsWithComponent<
      RootComponent,
      AdditionalProps,
      TitleTypographyComponent,
      SubheaderTypographyComponent
    >,
  ): React.JSX.Element;
}

export type CardHeaderProps<
  RootComponent extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
  AdditionalProps = {},
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span',
> = OverrideProps<
  CardHeaderTypeMap<
    AdditionalProps,
    RootComponent,
    TitleTypographyComponent,
    SubheaderTypographyComponent
  >,
  RootComponent
>;

export type CardHeaderPropsWithComponent<
  RootComponent extends React.ElementType = CardHeaderTypeMap['defaultComponent'],
  AdditionalProps = {},
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span',
> = {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: RootComponent;
} & CardHeaderProps<
  RootComponent,
  AdditionalProps,
  TitleTypographyComponent,
  SubheaderTypographyComponent
>;

export default CardHeader;
