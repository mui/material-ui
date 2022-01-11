import { CSSInterpolation } from '@mui/system';
import { GlobalStateSlot } from '@mui/base';
import { ButtonProps } from '../Button/ButtonProps';
import { ButtonClassKey } from '../Button/buttonClasses';
import { SwitchProps } from '../Switch/SwitchProps';
import { SwitchClassKey } from '../Switch/switchClasses';

export type OverridesStyleRules<ClassKey extends string = string> = Record<
  ClassKey,
  CSSInterpolation
>;

export interface Components {
  MuiButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: Partial<OverridesStyleRules<Exclude<ButtonClassKey, GlobalStateSlot>>>;
  };
  MuiSwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: Partial<OverridesStyleRules<Exclude<SwitchClassKey, GlobalStateSlot>>>;
  };
}
