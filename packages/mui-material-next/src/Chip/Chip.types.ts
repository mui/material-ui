import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/Theme.types';
import { ChipClasses } from './chipClasses';

export interface ChipPropsVariantOverrides {}

export interface ChipPropsSizeOverrides {}

export interface ChipPropsColorOverrides {}

export interface ChipTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & {
    /**
     * The Avatar element to display.
     */
    avatar?: React.ReactElement;
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
     */
    color?: OverridableStringUnion<
      'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'success' | 'warning',
      ChipPropsColorOverrides
    >;
    /**
     * Override the default delete icon element. Shown only if `onDelete` is set.
     */
    deleteIcon?: React.ReactElement;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Icon element.
     */
    icon?: React.ReactElement;
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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     *  @ignore
     */
    tabIndex?: number;
    /**
     * The variant to use.
     * @default 'filled'
     */
    variant?: OverridableStringUnion<'filled' | 'outlined' | 'elevated', ChipPropsVariantOverrides>;
  };
  defaultComponent: RootComponent;
}

export type ChipProps<
  RootComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ChipTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface ChipOwnerState extends ChipProps {
  variant: NonNullable<ChipProps['variant']>;
  size: NonNullable<ChipProps['size']>;
  /**
   * color for the icon component
   */
  hasIcon: boolean;
  hasDeleteIcon: boolean;
  hasAvatar: boolean;
}
