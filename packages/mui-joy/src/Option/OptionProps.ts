import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type OptionSlot = 'root';

export interface OptionSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export type OptionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  OptionSlots,
  {
    root: SlotProps<'li', {}, OptionOwnerState>;
  }
>;

export interface OptionPropsVariantOverrides {}
export interface OptionPropsColorOverrides {}

export interface OptionTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, OptionPropsColorOverrides>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * A text representation of the option's content.
     * Used for keyboard text navigation matching.
     */
    label?: string | React.ReactElement<any>;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, OptionPropsVariantOverrides>;
    /**
     * The option value.
     */
    value: any;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & OptionSlotsAndSlotProps;
  defaultComponent: D;
}

export interface ExtendOptionTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & OptionTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type OptionProps<
  D extends React.ElementType = OptionTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<OptionTypeMap<P, D>, D>;

export interface OptionOwnerState extends ApplyColorInversion<Omit<OptionProps, 'disabled'>> {
  /**
   * If `true` the item is disabled.
   */
  disabled: boolean;
  /**
   * If `true` the item is highlighted.
   */
  highlighted: boolean;
  /**
   * The 0-based index of the item.
   */
  index: number;
  /**
   * If `true` the item is selected.
   */
  selected: boolean;
  row: boolean;
}

export type ExtendOption<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendOptionTypeMap<M>, 'a'>,
) => React.JSX.Element) &
  OverridableComponent<ExtendOptionTypeMap<M>>;
