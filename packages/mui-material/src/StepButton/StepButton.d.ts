import * as React from 'react';
import { SxProps } from '@mui/system';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { StepButtonClasses } from './stepButtonClasses';

/**
 * @deprecated use `StepButtonProps['icon']` instead
 */
export type StepButtonIcon = React.ReactNode;

export type StepButtonTypeMap<
  AdditionalProps,
  DefaultComponent extends React.ElementType,
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & {
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
  };
  defaultComponent: DefaultComponent;

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
