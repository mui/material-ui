import * as React from 'react';
import { StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';
import { PaperProps } from '../Paper';

export interface AccordionProps extends StandardProps<PaperProps, AccordionClassKey, 'onChange'> {
  /**
   * The content of the accordion.
   */
  children: NonNullable<React.ReactNode>;
  /**
   * If `true`, expands the accordion by default.
   */
  defaultExpanded?: boolean;
  /**
   * If `true`, the accordion will be displayed in a disabled state.
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
   * @param {object} event The event source of the callback.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
  /**
   * The component used for the collapse effect.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type AccordionClassKey = 'root' | 'rounded' | 'expanded' | 'disabled';

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
