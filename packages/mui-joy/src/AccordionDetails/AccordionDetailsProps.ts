import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AccordionDetailsSlot = 'root';

export interface AccordionDetailsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type AccordionDetailsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionDetailsSlots,
  {
    root: SlotProps<'div', {}, AccordionDetailsOwnerState>;
  }
>;

export interface AccordionDetailsTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the AccordionDetails if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
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

export interface AccordionDetailsOwnerState extends AccordionDetailsProps {
  /**
   * The expanded state of the accordion.
   */
  expanded: boolean;
}
