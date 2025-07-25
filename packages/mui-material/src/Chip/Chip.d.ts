import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ChipClasses } from './chipClasses';

export interface ChipSlots {
  /**
   * The component that renders the root.
   * @default div
   */
  root: React.ElementType;
  /**
   * The component that renders the label.
   * @default span
   */
  label: React.ElementType;
}

export type ChipSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ChipSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the div element.
     */
    root: SlotProps<'div', {}, ChipOwnerState>;
    /**
     * Props forwarded to the label slot.
     * By default, the avaible props are based on the span element.
     */
    label: SlotProps<'span', {}, ChipOwnerState>;
  }
>;

export interface ChipOwnerState extends Omit<ChipProps, 'slots' | 'slotProps'> {}

export interface ChipPropsVariantOverrides {}

export interface ChipPropsSizeOverrides {}

export interface ChipPropsColorOverrides {}

export interface ChipOwnProps {
  /**
   * The Avatar element to display.
   */
  avatar?: React.ReactElement<unknown>;
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children?: null;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChipClasses>;
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable?: boolean;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color?: OverridableStringUnion<
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    ChipPropsColorOverrides
  >;
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon?: React.ReactElement<unknown>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon element.
   */
  icon?: React.ReactElement<unknown>;
  /**
   * The content of the component.
   */
  label?: React.ReactNode;
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete?: React.EventHandler<any>;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   *  @ignore
   */
  tabIndex?: number;
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<'filled' | 'outlined', ChipPropsVariantOverrides>;
}

export interface ChipTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ChipOwnProps & ChipSlotsAndSlotProps;
  defaultComponent: RootComponent;
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 *
 * Demos:
 *
 * - [Chip](https://mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [Chip API](https://mui.com/material-ui/api/chip/)
 */
declare const Chip: OverridableComponent<ChipTypeMap>;

export type ChipProps<
  RootComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ChipTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Chip;
