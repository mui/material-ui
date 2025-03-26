import * as React from 'react';
import { SxProps } from '@mui/system';
import { CollapseProps, InternalStandardProps as StandardProps } from '..';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { StepContentClasses } from './stepContentClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps } from '../utils/types';

export interface StepContentSlots {
  /**
   * The component that renders the transition slot.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<unknown, any> }
  >;
}

export type StepContentSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepContentSlots,
  {
    /**
     * Props forwared to the transition slot.
     * By default, the available props are based on the [Collapse](https://mui.com/material-ui/api/collapse/#props) component
     */
    transition: SlotComponentProps<React.ElementType, CollapseProps, StepContentOwnerState>;
  }
>;

export interface StepContentOwnerState extends StepContentProps {}

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    StepContentSlotsAndSlotProps {
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
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<unknown, any> }
  >;
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionProps?: TransitionProps;
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
