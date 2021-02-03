import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { Theme } from '..';

export type AccordionSummaryTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
      expanded?: string;
      /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
      focusVisible?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element unless `disableGutters={true}`. */
      gutters?: string;
      /** Styles applied to the children wrapper element unless `disableGutters={true}`. */
      contentGutters?: string;
      /** Styles applied to the children wrapper element. */
      content?: string;
      /** Styles applied to the `expandIcon`'s wrapper element. */
      expandIconWrapper?: string;
    };
    /**
     * The icon to display as the expand indicator.
     */
    expandIcon?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
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
