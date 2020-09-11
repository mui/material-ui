import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ChipPropsVariantOverrides {}
export type ChipVariantDefaults = Record<'default' | 'outlined', true>;

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
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `size="small"`. */
      sizeSmall?: string;
      /** Styles applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Styles applied to the root element if `color="secondary"`. */
      colorSecondary?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
      clickable?: string;
      /** Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
      clickableColorPrimary?: string;
      /** Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
      clickableColorSecondary?: string;
      /** Styles applied to the root element if `onDelete` is defined. */
      deletable?: string;
      /** Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
      deletableColorPrimary?: string;
      /** Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
      deletableColorSecondary?: string;
      /** Styles applied to the root element if `variant="outlined"`. */
      outlined?: string;
      /** Styles applied to the root element if `variant="default"`. */
      default?: string;
      /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
      outlinedPrimary?: string;
      /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
      outlinedSecondary?: string;
      /** Styles applied to the `avatar` element. */
      avatar?: string;
      /** Styles applied to the `avatar` element if `size="small"`. */
      avatarSmall?: string;
      /** Styles applied to the `avatar` element if `color="primary"`. */
      avatarColorPrimary?: string;
      /** Styles applied to the `avatar` element if `color="secondary"`. */
      avatarColorSecondary?: string;
      /** Styles applied to the `icon` element. */
      icon?: string;
      /** Styles applied to the `icon` element if `size="small"`. */
      iconSmall?: string;
      /** Styles applied to the `icon` element if `color="primary"`. */
      iconColorPrimary?: string;
      /** Styles applied to the `icon` element if `color="secondary"`. */
      iconColorSecondary?: string;
      /** Styles applied to the label `span` element. */
      label?: string;
      /** Styles applied to the label `span` element if `size="small"`. */
      labelSmall?: string;
      /** Styles applied to the `deleteIcon` element. */
      deleteIcon?: string;
      /** Styles applied to the `deleteIcon` element if `size="small"`. */
      deleteIconSmall?: string;
      /** Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`. */
      deleteIconColorPrimary?: string;
      /** Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
      deleteIconColorSecondary?: string;
      /** Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
      deleteIconOutlinedColorPrimary?: string;
      /** Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
      deleteIconOutlinedColorSecondary?: string;
      /** Pseudo-class applied to the root element if keyboard focused. */
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
     * @default 'default'
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
