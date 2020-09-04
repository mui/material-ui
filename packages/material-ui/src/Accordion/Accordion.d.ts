import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';
import { PaperProps } from '../Paper';

export interface AccordionProps extends StandardProps<PaperProps, 'onChange'> {
  /**
   * The content of the accordion.
   */
  children: NonNullable<React.ReactNode>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `square={false}`. */
    rounded?: string;
    /** Pseudo-class applied to the root element if `expanded={true}`. */
    expanded?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the region element, the container of the children. */
    region?: string;
  };
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * If `true`, the accordion will be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded?: boolean;
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

export type AccordionClassKey = keyof NonNullable<AccordionProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [Accordion API](https://material-ui.com/api/accordion/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Accordion(props: AccordionProps): JSX.Element;
