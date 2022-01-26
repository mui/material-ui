import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps } from '..';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { StepContentClasses } from './stepContentClasses';

export interface StepContentProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepContentClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.JSXElementConstructor<TransitionProps>;
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps?: TransitionProps;
}

export type StepContentClasskey = keyof NonNullable<StepContentProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://mui.com/components/steppers/)
 *
 * API:
 *
 * - [StepContent API](https://mui.com/api/step-content/)
 */
export default function StepContent(props: StepContentProps): JSX.Element;
