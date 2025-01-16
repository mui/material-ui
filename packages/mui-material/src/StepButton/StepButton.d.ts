import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import type { OverrideProps } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { StepButtonClasses } from './stepButtonClasses';

/**
 * @deprecated use `StepButtonProps['icon']` instead.
 */
export type StepButtonIcon = React.ReactNode;

export interface StepButtonOwnProps {
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepButtonClasses>;
  /**
   * The icon displayed by the step label.
   */
  icon?: React.ReactNode;
  /**
   * The optional node to display.
   */
  optional?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type StepButtonTypeMap<
  AdditionalProps,
  RootComponent extends React.ElementType,
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & StepButtonOwnProps;
  defaultComponent: RootComponent;

  ignoredProps: 'disabled';
}>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepButton API](https://mui.com/material-ui/api/step-button/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const StepButton: ExtendButtonBase<
  StepButtonTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type StepButtonClasskey = keyof NonNullable<StepButtonProps['classes']>;

export type StepButtonProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<StepButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default StepButton;
