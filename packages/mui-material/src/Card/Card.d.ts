import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { DistributiveOmit } from '@mui/types';
import type { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import type { Theme } from '..';
import type { PaperOwnProps } from '../Paper';
import type { CardClasses } from './cardClasses';

// TODO: v6 remove this interface, it is not used
export interface CardPropsColorOverrides {}

export interface CardOwnProps extends DistributiveOmit<PaperOwnProps, 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardClasses>;
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface CardTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & CardOwnProps;
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
 * - [Card API](https://mui.com/material-ui/api/card/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */

declare const Card: OverridableComponent<CardTypeMap>;

export type CardProps<
  RootComponent extends React.ElementType = CardTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Card;
