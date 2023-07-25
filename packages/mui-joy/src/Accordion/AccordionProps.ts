import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AccordionSlot = 'root';

export interface AccordionSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type AccordionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionSlots,
  {
    root: SlotProps<'div', {}, AccordionOwnerState>;
  }
>;

export interface AccordionTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the Accordion if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & AccordionSlotsAndSlotProps;
  defaultComponent: D;
}

export type AccordionProps<
  D extends React.ElementType = AccordionTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AccordionTypeMap<P, D>, D>;

export interface AccordionOwnerState extends AccordionProps {}
