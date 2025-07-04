import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { AccordionActionsClasses } from './accordionActionsClasses';

export interface AccordionActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionActionsClasses>;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionActions API](https://mui.com/material-ui/api/accordion-actions/)
 */
export default function AccordionActions(props: AccordionActionsProps): React.JSX.Element;
