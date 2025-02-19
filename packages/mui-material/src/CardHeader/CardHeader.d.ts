import * as React from 'react';
import { SxProps } from '@mui/system';
import { TypographyProps } from '../Typography';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '..';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { CardHeaderClasses } from './cardHeaderClasses';

export interface CardHeaderRootSlotPropsOverrides {}

export interface CardHeaderAvatarSlotPropsOverrides {}

export interface CardHeaderActionSlotPropsOverrides {}

export interface CardHeaderContentSlotPropsOverrides {}

export interface CardHeaderTitleSlotPropsOverrides {}

export interface CardHeaderSubheaderSlotPropsOverrides {}

export interface CardHeaderSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the avatar slot.
   * @default 'div'
   */
  avatar: React.ElementType;
  /**
   * The component that renders the action slot.
   * @default 'div'
   */
  action: React.ElementType;
  /**
   * The component that renders the content slot.
   * @default 'div'
   */
  content: React.ElementType;
  /**
   * The component that renders the title slot (as long as disableTypography is not `true`).
   * [Follow this guide](https://mui.com/material-ui/api/typography/#props) to learn more about the requirements for this component.
   * @default Typography
   */
  title: React.ElementType;
  /**
   * The component that renders the subheader slot (as long as disableTypography is not `true`).
   * [Follow this guide](https://mui.com/material-ui/api/typography/#props) to learn more about the requirements for this component.
   * @default Typography
   */
  subheader: React.ElementType;
}

export type CardHeaderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardHeaderSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the div element.
     */
    root: SlotProps<'div', CardHeaderRootSlotPropsOverrides, CardHeaderOwnerState>;
    /**
     * Props forwarded to the avatar slot.
     * By default, the avaible props are based on the div element.
     */
    avatar: SlotProps<'div', CardHeaderAvatarSlotPropsOverrides, CardHeaderOwnerState>;
    /**
     * Props forwarded to the action slot.
     * By default, the avaible props are based on the div element.
     */
    action: SlotProps<'div', CardHeaderActionSlotPropsOverrides, CardHeaderOwnerState>;
    /**
     * Props forwarded to the content slot.
     * By default, the avaible props are based on the div element.
     */
    content: SlotProps<'div', CardHeaderContentSlotPropsOverrides, CardHeaderOwnerState>;
    /**
     * Props forwarded to the title slot (as long as disableTypography is not `true`).
     * By default, the avaible props are based on the [Typography](https://mui.com/material-ui/api/typography/#props) component.
     */
    title: SlotProps<
      React.ElementType<TypographyProps>,
      CardHeaderTitleSlotPropsOverrides,
      CardHeaderOwnerState
    >;
    /**
     * Props forwarded to the subheader slot (as long as disableTypography is not `true`).
     * By default, the avaible props are based on the [Typography](https://mui.com/material-ui/api/typography/#props) component.
     */
    subheader: SlotProps<
      React.ElementType<TypographyProps>,
      CardHeaderSubheaderSlotPropsOverrides,
      CardHeaderOwnerState
    >;
  }
>;

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
   * @deprecated Use `slotProps.subheader` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
   * @deprecated Use `slotProps.title` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  titleTypographyProps?: TypographyProps<
    TitleTypographyComponent,
    {
      component?: TitleTypographyComponent;
    }
  >;
}

export interface CardHeaderOwnerState extends CardHeaderOwnProps {}

export interface CardHeaderTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
  TitleTypographyComponent extends React.ElementType = 'span',
  SubheaderTypographyComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps &
    CardHeaderOwnProps<TitleTypographyComponent, SubheaderTypographyComponent> &
    CardHeaderSlotsAndSlotProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardHeader API](https://mui.com/material-ui/api/card-header/)
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
