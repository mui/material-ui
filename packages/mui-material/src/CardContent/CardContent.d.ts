import type * as React from 'react';
import { type SxProps } from '@mui/system';
import { type OverridableComponent, type OverrideProps } from '../OverridableComponent';
import { type Theme } from '../styles';
import { type CardContentClasses } from './cardContentClasses';

export interface CardContentOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardContentClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CardContentTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & CardContentOwnProps;
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
 * - [CardContent API](https://mui.com/material-ui/api/card-content/)
 */
declare const CardContent: OverridableComponent<CardContentTypeMap>;

export type CardContentProps<
  RootComponent extends React.ElementType = CardContentTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardContentTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default CardContent;
