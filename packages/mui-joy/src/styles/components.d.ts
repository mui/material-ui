import { GlobalStateSlot } from '@mui/base';
import { CSSInterpolation } from '@mui/system';
import { ButtonProps, ButtonSlot } from '../Button/ButtonProps';
import { InputProps, InputSlot } from '../Input/InputProps';
import { SheetProps, SheetSlot } from '../Sheet/SheetProps';
import { SvgIconProps, SvgIconSlot } from '../SvgIcon/SvgIconProps';
import { SwitchProps, SwitchSlot } from '../Switch/SwitchProps';
import { TypographyProps, TypographySlot } from '../Typography/TypographyProps';

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentProps = Record<string, unknown>,
  Theme = unknown,
> = Partial<
  Record<
    Exclude<ClassKey, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentProps & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;

export interface Components<Theme = unknown> {
  MuiButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: OverridesStyleRules<ButtonSlot, ButtonProps, Theme>;
  };
  MuiSwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchSlot, SwitchProps, Theme>;
  };
  MuiTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<TypographySlot, TypographyProps, Theme>;
  };
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  MuiInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: OverridesStyleRules<InputSlot, InputProps, Theme>;
  };
  MuiSheet?: {
    defaultProps?: Partial<SheetProps>;
    styleOverrides?: OverridesStyleRules<SheetSlot, SheetProps, Theme>;
  };
}
