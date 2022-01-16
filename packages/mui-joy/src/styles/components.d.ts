import { CSSInterpolation } from '@mui/system';
import { GlobalStateSlot } from '@mui/base';
import { ButtonProps } from '../Button/ButtonProps';
import { ButtonClassKey } from '../Button/buttonClasses';
import { SwitchProps } from '../Switch/SwitchProps';
import { SwitchClassKey } from '../Switch/switchClasses';
import { TypographyProps } from '../Typography/TypographyProps';
import { TypographyClassKey } from '../Typography/typographyClasses';
import { SvgIconProps } from '../SvgIcon/SvgIconProps';
import { SvgIconClassKey } from '../SvgIcon/svgIconClasses';

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
    styleOverrides?: OverridesStyleRules<ButtonClassKey, ButtonProps, Theme>;
  };
  MuiSwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchClassKey, SwitchProps, Theme>;
  };
  MuiTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<TypographyClassKey, TypographyProps, Theme>;
  };
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconClassKey, SvgIconProps, Theme>;
  };
}
