import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '..';
import type { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import type { OverrideProps } from '../OverridableComponent';
import type { CardActionAreaClasses } from './cardActionAreaClasses';

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
 * - [Card](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActionArea API](https://mui.com/material-ui/api/card-action-area/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
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
