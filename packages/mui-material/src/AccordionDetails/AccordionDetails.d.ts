import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { AccordionDetailsClasses } from './accordionDetailsClasses';

export interface AccordionDetailsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionDetailsClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Accordion](https://v6.mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://v6.mui.com/material-ui/api/accordion-details/)
 */
export default function AccordionDetails(props: AccordionDetailsProps): React.JSX.Element;
