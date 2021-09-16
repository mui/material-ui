import * as React from 'react';
import { StandardProps } from '..';

export interface AccordionDetailsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AccordionDetailsClassKey> {
  /**
   * The content of the accordion details.
   */
  children?: React.ReactNode;
}

export type AccordionDetailsClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://mui.com/api/accordion-details/)
 */
export default function AccordionDetails(props: AccordionDetailsProps): JSX.Element;
