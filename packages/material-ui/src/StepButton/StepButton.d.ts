import * as React from 'react';
import { Orientation } from '../Stepper';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type StepButtonIcon = React.ReactElement | string | number | null;

export type StepButtonTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    active?: boolean;
    alternativeLabel?: boolean;
    completed?: boolean;
    disabled?: boolean;
    icon?: StepButtonIcon;
    last?: boolean;
    optional?: React.ReactNode;
    orientation?: Orientation;
  };
  component: D;
  classKey: StepButtonClasskey;
}>;

declare const StepButton: ExtendButtonBase<StepButtonTypeMap<{}, ButtonBaseTypeMap['component']>>;

export type StepButtonClasskey = 'root' | 'vertical' | 'touchRipple';

export type StepButtonProps<
  D extends React.ElementType = ButtonBaseTypeMap['component'],
  P = {}
> = OverrideProps<StepButtonTypeMap<P, D>, D>;

export default StepButton;
