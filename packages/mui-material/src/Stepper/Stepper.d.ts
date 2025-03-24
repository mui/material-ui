import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { PaperProps } from '../Paper';
import { StepperClasses } from './stepperClasses';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperOwnProps extends Pick<PaperProps, 'elevation' | 'square' | 'variant'> {
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep?: number;
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * @default false
   */
  alternativeLabel?: boolean;
  /**
   * Two or more `<Step />` components.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepperClasses>;
  /**
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector?: React.ReactElement<unknown, any> | null;
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear?: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface StepperTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & StepperOwnProps;
  defaultComponent: RootComponent;
}

export type StepperProps<
  RootComponent extends React.ElementType = StepperTypeMap['defaultComponent'],
  AdditionalProps = { component?: React.ElementType },
> = OverrideProps<StepperTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export type StepperClasskey = keyof NonNullable<StepperProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://v6.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [Stepper API](https://v6.mui.com/material-ui/api/stepper/)
 */
declare const Stepper: OverridableComponent<StepperTypeMap>;

export default Stepper;
