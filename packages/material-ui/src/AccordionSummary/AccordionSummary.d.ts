import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type AccordionSummaryTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the accordion summary.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      expanded?: string;
      focusVisible?: string;
      disabled?: string;
      content?: string;
      expandIconWrapper?: string;
    };
    /**
     * The icon to display as the expand indicator.
     */
    expandIcon?: React.ReactNode;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionSummary API](https://material-ui.com/api/accordion-summary/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const AccordionSummary: ExtendButtonBase<AccordionSummaryTypeMap>;

export type AccordionSummaryClassKey = keyof NonNullable<
  AccordionSummaryTypeMap['props']['classes']
>;

export type AccordionSummaryProps<
  D extends React.ElementType = AccordionSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AccordionSummaryTypeMap<P, D>, D>;

export default AccordionSummary;
