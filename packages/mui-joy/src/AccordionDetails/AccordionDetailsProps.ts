import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AccordionDetailsSlot = 'root' | 'content';

export interface AccordionDetailsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the content.
   * @default 'div'
   */
  content?: React.ElementType;
}

export type AccordionDetailsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionDetailsSlots,
  {
    root: SlotProps<'div', {}, AccordionDetailsOwnerState>;
    content: SlotProps<'div', {}, AccordionDetailsOwnerState>;
  }
>;

export interface AccordionDetailsPropsVariantOverrides {}
export interface AccordionDetailsPropsColorOverrides {}

export interface AccordionDetailsTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the AccordionDetails if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AccordionDetailsPropsColorOverrides>;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, AccordionDetailsPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & AccordionDetailsSlotsAndSlotProps;
  defaultComponent: D;
}

export type AccordionDetailsProps<
  D extends React.ElementType = AccordionDetailsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AccordionDetailsTypeMap<P, D>, D>;

export interface AccordionDetailsOwnerState extends ApplyColorInversion<AccordionDetailsProps> {
  /**
   * The expanded state of the accordion.
   */
  expanded: boolean;
}
