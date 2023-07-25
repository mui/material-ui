import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AccordionSummarySlot = 'root' | 'button';

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

export interface AccordionSummaryTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the AccordionSummary if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The indicator element to display.
     */
    indicator?: React.ReactNode;
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

export interface AccordionSummaryOwnerState extends AccordionSummaryProps {
  /**
   * If `true`, the accordion is disabled.
   */
  disabled: boolean;
  /**
   * The expanded state of the accordion.
   */
  expanded: boolean;
}
