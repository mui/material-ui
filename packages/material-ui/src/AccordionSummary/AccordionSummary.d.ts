import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';
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
     * The icon to display as the expand indicator.
     */
    expandIcon?: React.ReactNode;
    /**
     * Props applied to the `IconButton` element wrapping the expand icon.
     */
    IconButtonProps?: Partial<IconButtonProps>;
  };
  defaultComponent: D;
  classKey: AccordionSummaryClassKey;
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

export type AccordionSummaryClassKey =
  | 'root'
  | 'expanded'
  // deprecated
  | 'focused'
  | 'focusVisible'
  | 'disabled'
  | 'content'
  | 'expandIcon';

export type AccordionSummaryProps<
  D extends React.ElementType = AccordionSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AccordionSummaryTypeMap<P, D>, D>;

export default AccordionSummary;
