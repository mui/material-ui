import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { CardActionAreaClasses } from './cardActionAreaClasses';

export interface CardActionAreaOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardActionAreaClasses>;
  focusVisibleClassName?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type CardActionAreaTypeMap<
  AdditionalProps,
  RootComponent extends React.ElementType,
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & CardActionAreaOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Card](https://v6.mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActionArea API](https://v6.mui.com/material-ui/api/card-action-area/)
 * - inherits [ButtonBase API](https://v6.mui.com/material-ui/api/button-base/)
 */
declare const CardActionArea: ExtendButtonBase<
  CardActionAreaTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type CardActionAreaProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardActionAreaTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default CardActionArea;
