import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ChipDeleteSlot = 'root';

export interface ChipDeleteSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
}

export type ChipDeleteSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ChipDeleteSlots,
  {
    root: SlotProps<'button', {}, ChipDeleteOwnerState>;
  }
>;

export interface ChipDeletePropsColorOverrides {}
export interface ChipDeletePropsVariantOverrides {}

export interface ChipDeleteTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ChipDeletePropsColorOverrides>;
    /**
     * If provided, it will replace the default icon.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the component is disabled.
     * If `undefined`, the value inherits from the parent chip via a React context.
     */
    disabled?: boolean;
    /**
     * Callback fired when the component is not disabled and either:
     * - `Backspace`, `Enter` or `Delete` is pressed.
     * - The component is clicked.
     */
    onDelete?: React.EventHandler<
      React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
    >;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ChipDeletePropsVariantOverrides>;
  } & ChipDeleteSlotsAndSlotProps;
  defaultComponent: D;
}

export type ChipDeleteProps<
  D extends React.ElementType = ChipDeleteTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ChipDeleteTypeMap<P, D>, D>;

export interface ChipDeleteOwnerState extends ApplyColorInversion<ChipDeleteProps> {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible?: boolean;
}
