import * as React from 'react';
import { SxProps } from '@mui/system';
import { ButtonBaseProps, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { CreateSlotsAndSlotProps, SlotProps, Theme } from '..';
import { AccordionSummaryClasses } from './accordionSummaryClasses';

export interface AccordionSummarySlots {
  /**
   * The component that renders the root slot.
   * @default ButtonBase
   */
  root: React.ElementType;
  /**
   * The component that renders the content slot.
   * @default div
   */
  content: React.ElementType;
  /**
   * The component that renders the expand icon wrapper slot.
   * @default div
   */
  expandIconWrapper: React.ElementType;
}

export interface AccordionSummaryRootSlotPropsOverrides {}
export interface AccordionSummaryContentSlotPropsOverrides {}
export interface AccordionSummaryExpandIconWrapperSlotPropsOverrides {}

export type AccordionSummarySlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionSummarySlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [ButtonBase](https://mui.com/material-ui/api/button-base/#props) component.
     */
    root: SlotProps<
      React.ElementType<ButtonBaseProps>,
      AccordionSummaryRootSlotPropsOverrides,
      AccordionSummaryOwnerState
    >;
    /**
     * Props forwarded to the content slot.
     * By default, the avaible props are based on a div element.
     */
    content: SlotProps<
      'div',
      AccordionSummaryContentSlotPropsOverrides,
      AccordionSummaryOwnerState
    >;
    /**
     * Props forwarded to the expand icon wrapper slot.
     * By default, the avaible props are based on a div element.
     */
    expandIconWrapper: SlotProps<
      'div',
      AccordionSummaryExpandIconWrapperSlotPropsOverrides,
      AccordionSummaryOwnerState
    >;
  }
>;

export interface AccordionSummaryOwnProps extends AccordionSummarySlotsAndSlotProps {
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionSummaryClasses>;
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type AccordionSummaryTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & AccordionSummaryOwnProps;
  defaultComponent: RootComponent;
}>;

export interface AccordionSummaryOwnerState
  extends Omit<AccordionSummaryProps, 'slots' | 'slotProps'> {}

/**
 *
 * Demos:
 *
 * - [Accordion](https://v6.mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionSummary API](https://v6.mui.com/material-ui/api/accordion-summary/)
 * - inherits [ButtonBase API](https://v6.mui.com/material-ui/api/button-base/)
 */
declare const AccordionSummary: ExtendButtonBase<AccordionSummaryTypeMap>;

export type AccordionSummaryProps<
  RootComponent extends React.ElementType = AccordionSummaryTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AccordionSummaryTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default AccordionSummary;
