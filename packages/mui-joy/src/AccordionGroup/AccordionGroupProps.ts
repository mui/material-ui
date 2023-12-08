import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AccordionGroupSlot = 'root';

export interface AccordionGroupSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type AccordionGroupSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionGroupSlots,
  {
    root: SlotProps<'div', {}, AccordionGroupOwnerState>;
  }
>;

export interface AccordionGroupPropsSizeOverrides {}
export interface AccordionGroupPropsVariantOverrides {}
export interface AccordionGroupPropsColorOverrides {}

export interface AccordionGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the AccordionGroup if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AccordionGroupPropsColorOverrides>;
    /**
     * If `true`, the divider between accordions will be hidden.
     * @default false
     */
    disableDivider?: boolean;
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', AccordionGroupPropsSizeOverrides>;
    /**
     * The CSS transition for the Accordion details.
     * @default '0.2s ease'
     */
    transition?: string | { initial: string; expanded: string };
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, AccordionGroupPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & AccordionGroupSlotsAndSlotProps;
  defaultComponent: D;
}

export type AccordionGroupProps<
  D extends React.ElementType = AccordionGroupTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AccordionGroupTypeMap<P, D>, D>;

export interface AccordionGroupOwnerState extends ApplyColorInversion<AccordionGroupProps> {}
