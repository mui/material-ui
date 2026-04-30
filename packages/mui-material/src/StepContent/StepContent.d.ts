import type * as React from 'react';
import { type SxProps } from '@mui/system';
import { type Theme } from '../styles';
import { type InternalStandardProps as StandardProps } from '../internal';
import { type CollapseProps } from '../Collapse';
import { type TransitionProps } from '../transitions/transition';
import { type StepContentClasses } from './stepContentClasses';
import { type CreateSlotsAndSlotProps, type SlotComponentProps } from '../utils/types';

export interface StepContentSlots {
  /**
   * The component that renders the transition slot.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?:
    | React.JSXElementConstructor<TransitionProps & { children: React.ReactElement<unknown, any> }>
    | undefined;
}

export type StepContentSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepContentSlots,
  {
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Collapse](https://mui.com/material-ui/api/collapse/#props) component
     */
    transition: SlotComponentProps<
      React.ElementType<CollapseProps>,
      CollapseProps,
      StepContentOwnerState
    >;
  }
>;

export interface StepContentOwnerState extends StepContentProps {}

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>, StepContentSlotsAndSlotProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepContentClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto' | undefined;
}

export type StepContentClasskey = keyof NonNullable<StepContentProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepContent API](https://mui.com/material-ui/api/step-content/)
 */
export default function StepContent(props: StepContentProps): React.JSX.Element;
