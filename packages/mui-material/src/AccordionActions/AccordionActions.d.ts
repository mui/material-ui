import type * as React from 'react';
import { type SxProps } from '@mui/system';
import { type Theme } from '../styles';
import { type InternalStandardProps as StandardProps } from '../internal';
import { type AccordionActionsClasses } from './accordionActionsClasses';

export interface AccordionActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionActionsClasses> | undefined;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
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
