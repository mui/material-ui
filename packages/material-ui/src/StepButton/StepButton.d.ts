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
    active?: boolean;
    alternativeLabel?: boolean;
    completed?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    last?: boolean;
    optional?: React.ReactNode;
    orientation?: Orientation;
  };
  defaultComponent: D;
  classKey: StepButtonClasskey;
}>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://mui.com/components/steppers/)
 *
 * API:
 *
 * - [StepButton API](https://mui.com/api/step-button/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
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
