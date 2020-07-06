import * as React from 'react';
import { Orientation } from '../Stepper';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

/**
 * @deprecated use `StepButtonProps['icon']` instead
 */
export type StepButtonIcon = React.ReactNode;

export type StepButtonTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
     */
    children?: React.ReactNode;
    /**
     * For non-linear Steppers you need to manually set which steps are completed.
     * Otherwise the Stepper determines if a step is completed.
     */
    completed?: boolean;
    /**
     * @ignore This prop is ignored. You should disable the whole `Step`.
     */
    disabled?: boolean;
    /**
     * The icon displayed by the step label.
     */
    icon?: React.ReactNode;
    /**
     * The optional node to display.
     */
    optional?: React.ReactNode;
  };
  defaultComponent: D;
  classKey: StepButtonClasskey;
  ignoredProps: 'disabled';
}>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepButton API](https://material-ui.com/api/step-button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const StepButton: ExtendButtonBase<StepButtonTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

export type StepButtonClasskey = 'root' | 'vertical' | 'touchRipple';

export type StepButtonProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<StepButtonTypeMap<P, D>, D>;

export default StepButton;
