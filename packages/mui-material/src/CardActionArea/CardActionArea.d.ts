import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotProps, CreateSlotsAndSlotProps, Theme } from '..';
import {
  ButtonBaseProps,
  ButtonBaseTypeMap,
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { CardActionAreaClasses } from './cardActionAreaClasses';

export interface CardActionAreaSlots {
  /**
   * The component that renders the root.
   * @default ButtonBase
   */
  root: React.ElementType;
  /**
   * The component that renders the focusHighlight.
   * @default span
   */
  focusHighlight: React.ElementType;
}

export type CardActionAreaSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardActionAreaSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the span element.
     */
    root: SlotProps<React.ElementType<ButtonBaseProps>, {}, CardActionAreaOwnerState>;
    /**
     * Props forwarded to the focusHighlight slot.
     * By default, the avaible props are based on the span element.
     */
    focusHighlight: SlotProps<'span', {}, CardActionAreaOwnerState>;
  }
>;

export interface CardActionAreaOwnerState
  extends Omit<CardActionAreaProps, 'slots' | 'slotProps'> {}

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
  props: AdditionalProps & CardActionAreaOwnProps & CardActionAreaSlotsAndSlotProps;
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
