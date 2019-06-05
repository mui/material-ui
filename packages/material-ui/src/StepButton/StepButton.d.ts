import * as React from 'react';
import { Orientation } from '../Stepper';
import { ButtonBaseTypeMap, ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

export type StepButtonIcon = React.ReactElement | string | number | null;

declare const StepButton: ExtendButtonBase<{
  props: {
    active?: boolean;
    alternativeLabel?: boolean;
    completed?: boolean;
    disabled?: boolean;
    icon?: StepButtonIcon;
    last?: boolean;
    optional?: React.ReactNode;
    orientation?: Orientation;
  };
  defaultComponent: ButtonBaseTypeMap['defaultComponent'];
  classKey: StepButtonClasskey;
}>;

export type StepButtonClasskey = 'root' | 'vertical' | 'touchRipple';

export type StepButtonProps = SimplifiedPropsOf<typeof StepButton>;

export default StepButton;
