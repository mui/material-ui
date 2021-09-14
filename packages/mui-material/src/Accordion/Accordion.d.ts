import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { TransitionProps } from '../transitions/transition';
import { PaperProps } from '../Paper';
import { AccordionClasses } from './accordionClasses';

export interface AccordionProps extends StandardProps<PaperProps, 'onChange'> {
  /**
   * The content of the component.
   */
  children: NonNullable<React.ReactNode>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionClasses>;
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, it removes the margin between two expanded accordion items and the increase of height.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded?: boolean;
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/components/accordion/)
 *
 * API:
 *
 * - [Accordion API](https://mui.com/api/accordion/)
 * - inherits [Paper API](https://mui.com/api/paper/)
 */
export default function Accordion(props: AccordionProps): JSX.Element;
