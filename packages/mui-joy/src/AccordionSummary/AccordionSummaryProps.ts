import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AccordionSummarySlot = 'root' | 'button' | 'indicator';

export interface AccordionSummarySlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the button.
   * @default 'button'
   */
  button?: React.ElementType;
  /**
   * The component that renders the indicator.
   * @default 'span'
   */
  indicator?: React.ElementType;
}

export type AccordionSummarySlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionSummarySlots,
  {
    root: SlotProps<'div', {}, AccordionSummaryOwnerState>;
    button: SlotProps<'button', {}, AccordionSummaryOwnerState>;
    indicator: SlotProps<'span', {}, AccordionSummaryOwnerState>;
  }
>;

export interface AccordionSummaryPropsVariantOverrides {}

export interface AccordionSummaryPropsColorOverrides {}

export interface AccordionSummaryTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the AccordionSummary if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AccordionSummaryPropsColorOverrides>;
    /**
     * The indicator element to display.
     * @default <KeyboardArrowDown />
     */
    indicator?: React.ReactNode;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, AccordionSummaryPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & AccordionSummarySlotsAndSlotProps;
  defaultComponent: D;
}

export type AccordionSummaryProps<
  D extends React.ElementType = AccordionSummaryTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AccordionSummaryTypeMap<P, D>, D>;

export interface AccordionSummaryOwnerState extends ApplyColorInversion<AccordionSummaryProps> {
  /**
   * If `true`, the accordion is disabled.
   */
  disabled: boolean;
  /**
   * The expanded state of the accordion.
   */
  expanded: boolean;
}
