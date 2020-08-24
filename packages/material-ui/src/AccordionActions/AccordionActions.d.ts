import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface AccordionActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
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
    /** Styles applied to the root element if `disableSpacing={false}`. */
    spacing?: string;
  };
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

export type AccordionActionsClassKey = keyof NonNullable<AccordionActionsProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionActions API](https://material-ui.com/api/accordion-actions/)
 */
export default function AccordionActions(props: AccordionActionsProps): JSX.Element;
