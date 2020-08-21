import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface AccordionDetailsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the accordion details.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
}

export type AccordionDetailsClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://material-ui.com/api/accordion-details/)
 */
export default function AccordionDetails(props: AccordionDetailsProps): JSX.Element;
