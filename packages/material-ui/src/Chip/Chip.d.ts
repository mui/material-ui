import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ChipPropsVariantOverrides {}
export type ChipVariantDefaults = Record<'filled' | 'outlined', true>;

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Avatar element.
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
    classes?: {
      root?: string;
      sizeSmall?: string;
      colorPrimary?: string;
      colorSecondary?: string;
      disabled?: string;
      clickable?: string;
      clickableColorPrimary?: string;
      clickableColorSecondary?: string;
      deletable?: string;
      deletableColorPrimary?: string;
      deletableColorSecondary?: string;
      outlined?: string;
      filled?: string;
      outlinedPrimary?: string;
      outlinedSecondary?: string;
      avatar?: string;
      avatarSmall?: string;
      avatarColorPrimary?: string;
      avatarColorSecondary?: string;
      icon?: string;
      iconSmall?: string;
      iconColorPrimary?: string;
      iconColorSecondary?: string;
      label?: string;
      labelSmall?: string;
      deleteIcon?: string;
      deleteIconSmall?: string;
      deleteIconColorPrimary?: string;
      deleteIconColorSecondary?: string;
      deleteIconOutlinedColorPrimary?: string;
      deleteIconOutlinedColorSecondary?: string;
      focusVisible?: string;
    };
    /**
     * If `true`, the chip will appear clickable, and will raise when pressed,
     * even if the onClick prop is not defined.
     * If false, the chip will not be clickable, even if onClick prop is defined.
     * This can be used, for example,
     * along with the component prop to indicate an anchor Chip is clickable.
     */
    clickable?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'default'
     */
    color?: Exclude<PropTypes.Color, 'inherit'>;
    /**
     * Override the default delete icon element. Shown only if `onDelete` is set.
     */
    deleteIcon?: React.ReactElement;
    /**
     * If `true`, the chip should be displayed in a disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * Icon element.
     */
    icon?: React.ReactElement;
    /**
     * The content of the label.
     */
    label?: React.ReactNode;
    /**
     * Callback fired when the delete icon is clicked.
     * If set, the delete icon will be shown.
     */
    onDelete?: React.EventHandler<any>;
    /**
     * The size of the chip.
     * @default 'medium'
     */
    size?: 'small' | 'medium';
    /**
     * The variant to use.
     * @default 'filled'
     */
    variant?: OverridableStringUnion<ChipVariantDefaults, ChipPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 * Demos:
 *
 * - [Chips](https://material-ui.com/components/chips/)
 *
 * API:
 *
 * - [Chip API](https://material-ui.com/api/chip/)
 */
declare const Chip: OverridableComponent<ChipTypeMap>;

export type ChipClassKey = keyof NonNullable<ChipTypeMap['props']['classes']>;

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ChipTypeMap<P, D>, D>;

export default Chip;
